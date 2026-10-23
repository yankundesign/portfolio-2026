// Control Hub Agentic hover preview — v2 renderer.
//
// 6s loop at 60fps, 1280×800, built from cover-src.png alone. Every changing
// pixel is cut from the cover itself (the check, the in-progress arc, the
// idle ring, the three status lines, the blue and grey connector), so the
// first and last frames are the cover and the states match it exactly.
//
// Usage: swiftc -O render.swift -o render && ./render cover-src.png OUT_DIR
// Writes OUT_DIR/control-hub-agentic-preview.mp4 (H.264) and OUT_DIR/jpg/f00000.jpg…
// (for the WebM pass; see README.md).

import AppKit
import AVFoundation
import CoreGraphics

let args = CommandLine.arguments
let coverURL = URL(fileURLWithPath: args.count > 1 ? args[1] : "cover-src.png")
let outDir = URL(fileURLWithPath: args.count > 2 ? args[2] : "out")
let jpgDir = outDir.appendingPathComponent("jpg")
try? FileManager.default.createDirectory(at: jpgDir, withIntermediateDirectories: true)

let W = 1280, H = 800, FPS = 60, DURATION = 6.0
let K = 1280.0 / 1920.0 // cover → output
let C = CGPoint(x: 960, y: 600) // cover centre

let cover = NSImage(contentsOf: coverURL)!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
func crop(_ x: Int, _ y: Int, _ w: Int, _ h: Int) -> CGImage {
  cover.cropping(to: CGRect(x: x, y: y, width: w, height: h))!
}

// ── Geometry, measured on the 1920×1200 cover ───────────────────────────
// Step circles centre on x 349 (pixel), rows 88px apart.
let rows: [Int] = [415, 503, 591, 679]
let iconComplete = crop(335, 401, 29, 29) // step 1: check
let iconProgress = crop(335, 577, 29, 29) // step 3: blue arc on grey
let iconIdle = crop(335, 665, 29, 29) // step 4: grey ring
// Status line under each title, x 456…577, 25px band from row+20.
let statusComplete = crop(456, 435, 122, 25)
let statusProgress = crop(456, 611, 122, 25)
let statusIdle = crop(456, 699, 122, 25)
let statusBlank = crop(456, 735, 122, 25) // empty card, under step 4's status
// Connectors between steps: 63px, x 345…353. Nothing hangs below step 4.
let segTops: [Int] = [428, 516, 604]
let lineBlue = crop(345, 428, 9, 63)
let lineGrey = crop(345, 604, 9, 63)

// ── Timing ──────────────────────────────────────────────────────────────
enum State { case complete, progress, idle }
let fade = 0.2
let spin = 360.0 / 1.1 // deg/s — whole turns between 4.9s and 6.0s, so the loop point holds

// Step state changes: (time, new state). t = 0 is the cover.
let steps: [[(Double, State)]] = [
  [(0, .complete), (3.6, .progress), (4.15, .complete)],
  [(0, .complete), (3.6, .idle), (4.3, .progress), (4.75, .complete)],
  [(0, .progress), (1.3, .complete), (3.6, .idle), (4.9, .progress)],
  [(0, .idle), (1.5, .progress), (2.7, .complete), (3.6, .idle)],
]
// Connector fills: wipe in (top→bottom) at `fill`, fade out at `clear`.
struct Run { let fill: Double; let clear: Double }
let segs: [[Run]] = [
  [Run(fill: -1, clear: 3.6), Run(fill: 4.15, clear: 99)],
  [Run(fill: -1, clear: 3.6), Run(fill: 4.75, clear: 99)],
  [Run(fill: 1.3, clear: 3.6)],
]

// Camera keyframes: (time, scale, focus x, focus y) in cover space.
let cam: [(Double, Double, Double, Double)] = [
  (0.0, 1.0, 960, 600),
  (0.4, 1.0, 960, 600),
  (1.7, 1.6, 640, 590),
  (3.4, 1.62, 640, 596),
  (4.0, 1.6, 640, 505),
  (4.7, 1.6, 640, 520),
  (5.75, 1.0, 960, 600),
  (6.0, 1.0, 960, 600),
]

func clamp(_ x: Double) -> Double { min(max(x, 0), 1) }
func easeInOut(_ x: Double) -> Double { x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2 }
func easeOut(_ x: Double) -> Double { 1 - pow(1 - x, 3) }
func smooth(_ x: Double) -> Double { let c = clamp(x); return c * c * (3 - 2 * c) }

func camera(_ t: Double) -> (Double, CGPoint) {
  for i in 0..<(cam.count - 1) where t >= cam[i].0 && t <= cam[i + 1].0 {
    let a = cam[i], b = cam[i + 1]
    let u = easeInOut(clamp((t - a.0) / max(b.0 - a.0, 1e-6)))
    return (a.1 + (b.1 - a.1) * u, CGPoint(x: a.2 + (b.2 - a.2) * u, y: a.3 + (b.3 - a.3) * u))
  }
  return (1, C)
}

/// The latest change at time t: from-state, to-state, and progress through the fade.
func transition(_ events: [(Double, State)], _ t: Double) -> (State, State, Double) {
  var from = events[0].1, to = events[0].1, u = 1.0
  for (i, e) in events.enumerated().dropFirst() where t >= e.0 {
    from = events[i - 1].1
    to = e.1
    u = clamp((t - e.0) / fade)
  }
  return (from, to, u)
}

/// Blend weights for a step at time t, plus when its current progress spin began.
func weights(_ events: [(Double, State)], _ t: Double) -> ([State: Double], Double) {
  var w: [State: Double] = [events[0].1: 1]
  var spinStart = 0.0
  for e in events.dropFirst() where t >= e.0 {
    let u = smooth((t - e.0) / fade)
    for (k, v) in w { w[k] = v * (1 - u) }
    w[e.1, default: 0] += u
    if e.1 == .progress { spinStart = e.0 }
  }
  return (w, spinStart)
}

func sprite(_ s: State, icon: Bool) -> CGImage {
  switch s {
  case .complete: return icon ? iconComplete : statusComplete
  case .progress: return icon ? iconProgress : statusProgress
  case .idle: return icon ? iconIdle : statusIdle
  }
}

// Draw a CGImage with its top-left at (x, y) in a y-down context.
func draw(_ ctx: CGContext, _ img: CGImage, _ x: Double, _ y: Double, alpha: Double = 1) {
  ctx.saveGState()
  ctx.setAlpha(alpha)
  ctx.translateBy(x: x, y: y + Double(img.height))
  ctx.scaleBy(x: 1, y: -1)
  ctx.draw(img, in: CGRect(x: 0, y: 0, width: img.width, height: img.height))
  ctx.restoreGState()
}

func render(_ t: Double, into ctx: CGContext) {
  ctx.saveGState()
  ctx.clear(CGRect(x: 0, y: 0, width: W, height: H))
  // y-down, cover coordinates under the camera.
  ctx.translateBy(x: 0, y: Double(H))
  ctx.scaleBy(x: 1, y: -1)
  let (s, f) = camera(t)
  ctx.scaleBy(x: K, y: K)
  ctx.translateBy(x: C.x, y: C.y)
  ctx.scaleBy(x: s, y: s)
  ctx.translateBy(x: -f.x, y: -f.y)
  draw(ctx, cover, 0, 0)

  // Connectors: grey base, blue wiped in from the top, faded out on reset.
  for (j, runs) in segs.enumerated() {
    let top = Double(segTops[j])
    draw(ctx, lineGrey, 345, top)
    for r in runs {
      let fillU = r.fill < 0 ? 1 : easeOut(clamp((t - r.fill) / 0.25))
      let alpha = 1 - smooth((t - r.clear) / 0.3)
      guard t >= r.fill || r.fill < 0, fillU > 0, alpha > 0 else { continue }
      ctx.saveGState()
      ctx.clip(to: CGRect(x: 345, y: top, width: 9, height: 63 * fillU))
      draw(ctx, lineBlue, 345, top, alpha: alpha)
      ctx.restoreGState()
    }
  }

  // Steps: icon (circle-clipped; the arc spins while in progress) and status.
  for (k, events) in steps.enumerated() {
    let cy = Double(rows[k]) + 0.5
    let cx = 349.5
    let (w, spinStart) = weights(events, t)
    for (state, weight) in w.sorted(by: { $0.value < $1.value }) where weight > 0.001 {
      // Icon
      ctx.saveGState()
      ctx.addEllipse(in: CGRect(x: cx - 12.9, y: cy - 12.9, width: 25.8, height: 25.8))
      ctx.clip()
      ctx.translateBy(x: cx, y: cy)
      if state == .progress {
        ctx.rotate(by: (t - spinStart) * spin * .pi / 180)
      }
      if state == .complete {
        // A small settle as the check lands.
        let since = t - (events.last(where: { $0.1 == .complete && $0.0 <= t })?.0 ?? -9)
        let pop = since < 0.35 ? 1 + 0.12 * sin(.pi * clamp(since / 0.35)) : 1
        ctx.scaleBy(x: pop, y: pop)
      }
      draw(ctx, sprite(state, icon: true), -14.5, -14.5, alpha: weight)
      ctx.restoreGState()
    }
    // Status line: dip through the blank card so two words never overlap.
    let (from, to, u) = transition(events, t)
    let sy = Double(rows[k]) + 20
    draw(ctx, sprite(from, icon: false), 456, sy)
    if u < 1 {
      draw(ctx, statusBlank, 456, sy, alpha: smooth(u * 2))
      draw(ctx, sprite(to, icon: false), 456, sy, alpha: smooth(u * 2 - 1))
    } else {
      draw(ctx, sprite(to, icon: false), 456, sy)
    }
  }
  ctx.restoreGState()
}

// ── Output ─────────────────────────────────────────────────────────────
let mp4URL = outDir.appendingPathComponent("control-hub-agentic-preview.mp4")
try? FileManager.default.removeItem(at: mp4URL)
let writer = try! AVAssetWriter(outputURL: mp4URL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: W,
  AVVideoHeightKey: H,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: 2_400_000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 60,
  ],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
  kCVPixelBufferWidthKey as String: W,
  kCVPixelBufferHeightKey as String: H,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let space = CGColorSpace(name: CGColorSpace.sRGB)!
let frames = Int(DURATION * Double(FPS))
for i in 0..<frames {
  let t = Double(i) / Double(FPS)
  var pb: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
  let buffer = pb!
  CVPixelBufferLockBaseAddress(buffer, [])
  let ctx = CGContext(
    data: CVPixelBufferGetBaseAddress(buffer), width: W, height: H, bitsPerComponent: 8,
    bytesPerRow: CVPixelBufferGetBytesPerRow(buffer), space: space,
    bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
  ctx.interpolationQuality = .high
  render(t, into: ctx)
  // JPEG for the WebM pass.
  let still = ctx.makeImage()!
  let rep = NSBitmapImageRep(cgImage: still)
  let jpg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.95])!
  try! jpg.write(to: jpgDir.appendingPathComponent(String(format: "f%05d.jpg", i)))
  CVPixelBufferUnlockBaseAddress(buffer, [])
  while !input.isReadyForMoreMediaData { usleep(1000) }
  adaptor.append(buffer, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: CMTimeScale(FPS)))
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
print(writer.status == .completed ? "wrote \(frames) frames → \(mp4URL.path)" : "failed: \(String(describing: writer.error))")
