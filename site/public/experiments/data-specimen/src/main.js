const canvas = document.querySelector("#specimen-canvas");
const ctx = canvas.getContext("2d", { alpha: true });
const shapeButtons = [...document.querySelectorAll(".shape-button")];
const renderSwitch = document.querySelector("#render-switch");
const densityRange = document.querySelector("#density-range");
const motionRange = document.querySelector("#motion-range");
const thresholdRange = document.querySelector("#threshold-range");
const uploadInput = document.querySelector("#mask-upload");
const resetButton = document.querySelector("#reset-button");
const specimenNote = document.querySelector("#specimen-note");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const maskCanvas = document.createElement("canvas");
const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });

const state = {
  shape: "fish",
  density: Number(densityRange.value),
  current: prefersReducedMotion.matches ? 0 : Number(motionRange.value) / 100,
  threshold: Number(thresholdRange.value),
  renderMode: "particle",
  uploadedImage: null,
  uploadedName: "",
};

const pointer = {
  active: false,
  x: 0,
  y: 0,
};

const markSets = {
  fish: ["star", "cross", "pin", "dash"],
  jellyfish: ["star", "pin", "diamond", "dash"],
  butterfly: ["cross", "diamond", "pin", "star"],
  upload: ["star", "cross", "pin", "diamond"],
};

const shapeCopy = {
  fish: {
    label: "fish mask",
    motion: "swimming current",
  },
  jellyfish: {
    label: "jellyfish mask",
    motion: "pulsing bell current",
  },
  butterfly: {
    label: "butterfly mask",
    motion: "wingbeat field",
  },
  upload: {
    label: "imported mask",
    motion: "animated field",
  },
};

let particles = [];
let view = {
  width: 960,
  height: 640,
  dpr: 1,
};
let maskPlacement = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

const JELLYFISH_TENTACLE_COUNT = 14;
const JELLYFISH_ORAL_ARM_COUNT = 5;

function traceButterflyUpperWing(context, side) {
  context.moveTo(side * 16, -72);
  context.bezierCurveTo(side * 70, -176, side * 196, -238, side * 326, -208);
  context.bezierCurveTo(side * 432, -184, side * 428, -54, side * 334, 68);
  context.bezierCurveTo(side * 246, 120, side * 96, 48, side * 16, -18);
  context.closePath();
}

function traceButterflyLowerWing(context, side) {
  context.moveTo(side * 14, 34);
  context.bezierCurveTo(side * 102, 50, side * 228, 104, side * 252, 190);
  context.bezierCurveTo(side * 274, 276, side * 158, 320, side * 66, 252);
  context.bezierCurveTo(side * 34, 196, side * 22, 94, side * 8, 58);
  context.closePath();
}

function jellyfishLocalToMask(x, y) {
  const rotation = -0.05;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return {
    x: 450 + x * cos - y * sin,
    y: 560 * 0.34 + x * sin + y * cos,
  };
}

function jellyfishTentacleLocal(strandIndex, t, phase = 0) {
  const startX = -168 + (strandIndex * 336) / (JELLYFISH_TENTACLE_COUNT - 1);
  const seed = strandIndex * 1.73;
  const length = 314 + (strandIndex % 4) * 22 + Math.sin(seed) * 16;
  const y = 50 + t * length;
  const drift = Math.sin(t * Math.PI * 1.75 + seed + phase) * (6 + t * 18);
  const lean = Math.sin(seed * 0.7) * t * 22;

  return {
    x: startX + drift + lean,
    y,
  };
}

function jellyfishOralArmLocal(armIndex, t, phase = 0) {
  const startX = -48 + armIndex * 24;
  const seed = armIndex * 1.31;
  const y = 42 + t * (282 + (armIndex % 2) * 24);
  const drift = Math.sin(t * Math.PI * 2.1 + seed + phase) * (10 + t * 18);

  return {
    x: startX + drift,
    y,
  };
}

function setupCanvas() {
  const rect = canvas.getBoundingClientRect();
  view = {
    width: Math.max(320, rect.width),
    height: Math.max(320, rect.height),
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  };

  canvas.width = Math.round(view.width * view.dpr);
  canvas.height = Math.round(view.height * view.dpr);
  ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);

  buildParticles();
}

function drawMask(shape) {
  const w = 900;
  const h = 560;
  maskCanvas.width = w;
  maskCanvas.height = h;
  maskCtx.clearRect(0, 0, w, h);
  maskCtx.fillStyle = "#000";
  maskCtx.strokeStyle = "#000";
  maskCtx.lineCap = "round";
  maskCtx.lineJoin = "round";

  if (state.uploadedImage) {
    drawUploadedMask(w, h);
    return;
  }

  if (shape === "fish") {
    maskCtx.save();
    maskCtx.translate(w * 0.5, h * 0.5);
    maskCtx.rotate(-0.03);
    maskCtx.beginPath();
    maskCtx.ellipse(-42, 0, 228, 118, -0.03, 0, Math.PI * 2);
    maskCtx.fill();

    maskCtx.beginPath();
    maskCtx.moveTo(160, 0);
    maskCtx.lineTo(326, -118);
    maskCtx.quadraticCurveTo(286, -12, 334, 118);
    maskCtx.closePath();
    maskCtx.fill();

    maskCtx.beginPath();
    maskCtx.ellipse(-110, -108, 72, 38, -0.65, 0, Math.PI * 2);
    maskCtx.fill();

    maskCtx.beginPath();
    maskCtx.ellipse(-78, 112, 98, 40, 0.66, 0, Math.PI * 2);
    maskCtx.fill();

    maskCtx.globalCompositeOperation = "destination-out";
    maskCtx.beginPath();
    maskCtx.arc(-216, -30, 15, 0, Math.PI * 2);
    maskCtx.fill();
    maskCtx.restore();
    return;
  }

  if (shape === "jellyfish") {
    maskCtx.save();
    maskCtx.translate(w * 0.5, h * 0.34);
    maskCtx.rotate(-0.05);
    maskCtx.beginPath();
    maskCtx.moveTo(-222, 42);
    maskCtx.bezierCurveTo(-204, -96, -96, -186, 34, -190);
    maskCtx.bezierCurveTo(164, -190, 242, -86, 224, 40);
    for (let x = 190; x >= -190; x -= 38) {
      maskCtx.quadraticCurveTo(x - 19, 82, x - 38, 46 + Math.sin(x * 0.08) * 4);
    }
    maskCtx.closePath();
    maskCtx.fill();

    maskCtx.lineWidth = 6;
    for (let i = 0; i < JELLYFISH_TENTACLE_COUNT; i += 1) {
      const start = jellyfishTentacleLocal(i, 0);
      const midA = jellyfishTentacleLocal(i, 0.34);
      const midB = jellyfishTentacleLocal(i, 0.72);
      const end = jellyfishTentacleLocal(i, 1);
      maskCtx.beginPath();
      maskCtx.moveTo(start.x, start.y);
      maskCtx.bezierCurveTo(midA.x, midA.y, midB.x, midB.y, end.x, end.y);
      maskCtx.stroke();
    }

    maskCtx.lineWidth = 3;
    for (let i = 0; i < JELLYFISH_TENTACLE_COUNT - 1; i += 1) {
      const start = jellyfishTentacleLocal(i + 0.5, 0.03);
      const midA = jellyfishTentacleLocal(i + 0.5, 0.4);
      const midB = jellyfishTentacleLocal(i + 0.5, 0.76);
      const end = jellyfishTentacleLocal(i + 0.5, 1);
      maskCtx.beginPath();
      maskCtx.moveTo(start.x, start.y);
      maskCtx.bezierCurveTo(midA.x, midA.y, midB.x, midB.y, end.x, end.y);
      maskCtx.stroke();
    }

    maskCtx.lineWidth = 16;
    for (let i = 0; i < JELLYFISH_ORAL_ARM_COUNT; i += 1) {
      const start = jellyfishOralArmLocal(i, 0);
      const midA = jellyfishOralArmLocal(i, 0.36);
      const midB = jellyfishOralArmLocal(i, 0.72);
      const end = jellyfishOralArmLocal(i, 1);
      maskCtx.beginPath();
      maskCtx.moveTo(start.x, start.y);
      maskCtx.bezierCurveTo(midA.x, midA.y, midB.x, midB.y, end.x, end.y);
      maskCtx.stroke();
    }
    maskCtx.restore();
    return;
  }

  if (shape === "butterfly") {
    maskCtx.save();
    maskCtx.translate(w * 0.5, h * 0.5);

    maskCtx.beginPath();
    traceButterflyUpperWing(maskCtx, -1);
    traceButterflyUpperWing(maskCtx, 1);
    maskCtx.fill();

    maskCtx.beginPath();
    traceButterflyLowerWing(maskCtx, -1);
    traceButterflyLowerWing(maskCtx, 1);
    maskCtx.fill();

    maskCtx.beginPath();
    maskCtx.ellipse(0, 28, 24, 154, 0, 0, Math.PI * 2);
    maskCtx.fill();

    maskCtx.lineWidth = 7;
    maskCtx.beginPath();
    maskCtx.moveTo(-10, -114);
    maskCtx.quadraticCurveTo(-72, -204, -144, -184);
    maskCtx.moveTo(10, -114);
    maskCtx.quadraticCurveTo(72, -204, 144, -184);
    maskCtx.stroke();
    maskCtx.restore();
    return;
  }
}

function drawUploadedMask(w, h) {
  const image = state.uploadedImage;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = w / h;
  let drawWidth = w * 0.72;
  let drawHeight = h * 0.72;

  if (imageRatio > boxRatio) {
    drawHeight = drawWidth / imageRatio;
  } else {
    drawWidth = drawHeight * imageRatio;
  }

  const x = (w - drawWidth) / 2;
  const y = (h - drawHeight) / 2;
  maskCtx.drawImage(image, x, y, drawWidth, drawHeight);

  const source = maskCtx.getImageData(0, 0, w, h);
  const output = maskCtx.createImageData(w, h);
  const data = source.data;
  const out = output.data;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3] / 255;
    const luminance = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const isObject = alpha > 0.16 && luminance < state.threshold;
    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = isObject ? 255 : 0;
  }

  maskCtx.putImageData(output, 0, 0);
}

function drawJellyfishBellMask(w, h) {
  maskCanvas.width = w;
  maskCanvas.height = h;
  maskCtx.clearRect(0, 0, w, h);
  maskCtx.fillStyle = "#000";
  maskCtx.save();
  maskCtx.translate(w * 0.5, h * 0.34);
  maskCtx.rotate(-0.05);
  maskCtx.beginPath();
  maskCtx.moveTo(-222, 42);
  maskCtx.bezierCurveTo(-204, -96, -96, -186, 34, -190);
  maskCtx.bezierCurveTo(164, -190, 242, -86, 224, 40);
  for (let x = 190; x >= -190; x -= 38) {
    maskCtx.quadraticCurveTo(x - 19, 82, x - 38, 46 + Math.sin(x * 0.08) * 4);
  }
  maskCtx.closePath();
  maskCtx.fill();
  maskCtx.restore();
}

function sampleJellyfishBellPoints(count) {
  const w = 900;
  const h = 560;
  drawJellyfishBellMask(w, h);
  const data = maskCtx.getImageData(0, 0, w, h).data;
  const points = [];
  const maxAttempts = count * 80;
  let attempts = 0;

  while (points.length < count && attempts < maxAttempts) {
    attempts += 1;
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const alpha = data[(y * w + x) * 4 + 3];
    if (alpha > 60) {
      points.push({ x, y, feature: "jellyBell" });
    }
  }

  return points;
}

function sampleJellyfishCurvePoints(count, curveCount, pointFactory, feature) {
  const points = [];

  for (let i = 0; i < count; i += 1) {
    const curveIndex = i % curveCount;
    const t = Math.pow((i + Math.random()) / count, 0.78);
    const local = pointFactory(curveIndex, t);
    const point = jellyfishLocalToMask(local.x + (Math.random() - 0.5) * 2.8, local.y);
    points.push({
      x: point.x,
      y: point.y,
      feature,
      strandIndex: curveIndex,
      strandT: t,
    });
  }

  return points;
}

function sampleJellyfishPoints(count) {
  maskCanvas.width = 900;
  maskCanvas.height = 560;

  const bellCount = Math.round(count * 0.64);
  const oralArmCount = Math.round(count * 0.14);
  const tentacleCount = count - bellCount - oralArmCount;

  return [
    ...sampleJellyfishBellPoints(bellCount),
    ...sampleJellyfishCurvePoints(
      tentacleCount,
      JELLYFISH_TENTACLE_COUNT,
      jellyfishTentacleLocal,
      "jellyTentacle",
    ),
    ...sampleJellyfishCurvePoints(
      oralArmCount,
      JELLYFISH_ORAL_ARM_COUNT,
      jellyfishOralArmLocal,
      "jellyOralArm",
    ),
  ];
}

function sampleMaskPoints(count) {
  if (!state.uploadedImage && state.shape === "jellyfish") {
    return sampleJellyfishPoints(count);
  }

  drawMask(state.shape);
  const w = maskCanvas.width;
  const h = maskCanvas.height;
  const data = maskCtx.getImageData(0, 0, w, h).data;
  const points = [];
  const maxAttempts = count * 80;
  let attempts = 0;

  while (points.length < count && attempts < maxAttempts) {
    attempts += 1;
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const alpha = data[(y * w + x) * 4 + 3];
    if (alpha > 60) {
      points.push({ x, y });
    }
  }

  if (!points.length) {
    state.uploadedImage = null;
    state.uploadedName = "";
    drawMask(state.shape);
    return sampleMaskPoints(count);
  }

  return points;
}

function buildParticles() {
  const previous = particles;
  const count = state.density;
  const maskPoints = sampleMaskPoints(count);
  const scale = Math.min(view.width / 900, view.height / 560) * 0.84;
  const offsetX = view.width / 2 - (maskCanvas.width * scale) / 2;
  const offsetY = view.height / 2 - (maskCanvas.height * scale) / 2 - view.height * 0.025;
  maskPlacement = { scale, offsetX, offsetY };
  const shape = state.uploadedImage ? "upload" : state.shape;
  const marks = markSets[shape];
  const centerX = offsetX + (maskCanvas.width * scale) / 2;
  const centerY = offsetY + (maskCanvas.height * scale) / 2;

  particles = maskPoints.map((point, index) => {
    const old = previous[index % Math.max(1, previous.length)];
    const homeX = offsetX + point.x * scale;
    const homeY = offsetY + point.y * scale;
    const seed = Math.random() * 1000;
    const relX = homeX - centerX;
    const relY = homeY - centerY;

    return {
      homeX,
      homeY,
      centerX,
      centerY,
      relX,
      relY,
      normX: (point.x / maskCanvas.width - 0.5) * 2,
      normY: (point.y / maskCanvas.height - 0.5) * 2,
      feature: point.feature ?? "",
      strandIndex: point.strandIndex ?? 0,
      strandT: point.strandT ?? 0,
      x: old ? old.x : homeX + (Math.random() - 0.5) * view.width * 0.18,
      y: old ? old.y : homeY + (Math.random() - 0.5) * view.height * 0.18,
      vx: old ? old.vx : 0,
      vy: old ? old.vy : 0,
      z: old ? old.z : (Math.random() - 0.5) * 0.7,
      vz: old ? old.vz : 0,
      baseZ: (Math.random() - 0.5) * 0.72,
      seed,
      size: 2.6 + Math.random() * 6.2,
      mark: marks[Math.floor(Math.random() * marks.length)],
      alpha: 0.18 + Math.random() * 0.58,
      shift: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.7,
      twinkleRate: 1.8 + Math.random() * 3.6,
    };
  });

  updateCaption();
}

function updateCaption() {
  const shape = state.uploadedImage ? "upload" : state.shape;
  const copy = shapeCopy[shape];
  const label = state.uploadedImage ? state.uploadedName || copy.label : copy.label;
  const motion = state.current === 0 ? "still field" : copy.motion;
  specimenNote.textContent = `${label} · ${state.renderMode} mode · ${motion} · pointer-sensitive field`;
}

function drawBackground(time) {
  ctx.clearRect(0, 0, view.width, view.height);
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#16265e";
  ctx.lineWidth = 1;

  const y = view.height * 0.12 + Math.sin(time * 0.18) * 5;
  ctx.beginPath();
  ctx.moveTo(view.width * 0.16, y);
  ctx.bezierCurveTo(view.width * 0.36, y + 18, view.width * 0.6, y - 22, view.width * 0.84, y + 8);
  ctx.stroke();
  ctx.restore();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function getButterflyPose(time, current) {
  const wingTime = time * (6.4 + current * 2.1);
  const beat = Math.sin(wingTime);
  const fold = Math.pow((1 - Math.cos(wingTime)) / 2, 0.82) * current;

  return {
    beat,
    fold,
    tilt: Math.sin(time * 0.74) * 0.05 * current,
    flightX: Math.sin(time * 0.58) * 28 * current,
    flightY: Math.sin(time * 1.08 + 0.6) * 16 * current - Math.abs(beat) * 5 * current,
  };
}

function getButterflyWingFactors(localX) {
  const side = Math.sign(localX || 1);
  const normalizedX = Math.abs(localX / 450);

  return {
    side,
    wing: smoothstep(0.08, 0.98, normalizedX),
    outerWing: smoothstep(0.36, 0.98, normalizedX),
  };
}

function butterflyLocalToView(localX, localY, time, current) {
  const pose = getButterflyPose(time, current);
  const { side, wing, outerWing } = getButterflyWingFactors(localX);
  const relX = localX * maskPlacement.scale;
  const relY = localY * maskPlacement.scale;
  const hingeX = side * 18;
  const localWingX = relX - hingeX;
  const foldedX = hingeX + localWingX * (1 - wing * pose.fold * 0.3);
  const liftedY = relY * (1 - wing * pose.fold * 0.045) - outerWing * pose.fold * 42;
  const rotatedX = foldedX * Math.cos(pose.tilt) - liftedY * Math.sin(pose.tilt);
  const rotatedY = foldedX * Math.sin(pose.tilt) + liftedY * Math.cos(pose.tilt);

  return {
    x: maskPlacement.offsetX + 450 * maskPlacement.scale + rotatedX + pose.flightX,
    y: maskPlacement.offsetY + 280 * maskPlacement.scale + rotatedY + pose.flightY,
    pose,
    side,
    wing,
    outerWing,
  };
}

function getParticleMotion(particle, time, current) {
  const shape = state.uploadedImage ? "upload" : state.shape;
  let targetX = particle.homeX;
  let targetY = particle.homeY;
  let targetZ = particle.baseZ;
  let alphaScale = 1;
  let sizeScale = 1;
  let rotation = particle.spin + time * particle.spinSpeed * (0.2 + current);

  const ambientX =
    Math.sin(time * 0.44 + particle.seed + particle.homeY * 0.018) * 5 * current +
    Math.sin(time * 0.21 + particle.homeX * 0.012 + particle.shift) * 3 * current;
  const ambientY =
    Math.cos(time * 0.38 + particle.seed * 0.9 + particle.homeX * 0.014) * 5 * current +
    Math.sin(time * 0.18 + particle.homeY * 0.01) * 3 * current;

  if (shape === "fish") {
    const tail = smoothstep(0.1, 0.95, particle.normX);
    const bodyRoundness = 1 - smoothstep(0.08, 1, Math.abs(particle.normY));
    const wave = Math.sin(time * (2.8 + current * 1.8) + particle.normX * 5.6 + particle.shift);
    targetX += Math.sin(time * 1.12) * 28 * current + wave * tail * 11 * current + ambientX;
    targetY += Math.sin(time * 1.55 + 0.7) * 10 * current + wave * (7 + tail * 30) * current + ambientY;
    targetZ += bodyRoundness * 0.38 + Math.sin(time * 1.1 + particle.normX * 2.3) * 0.18 * current;
    targetZ += wave * tail * 0.32 * current;
    rotation += wave * tail * 0.08 * current;
  } else if (shape === "jellyfish") {
    const tentacle = smoothstep(-0.04, 0.96, particle.normY);
    const bell = 1 - smoothstep(-0.62, 0.2, particle.normY);
    const pulse = (Math.sin(time * (1.8 + current * 1.05)) + 1) / 2;
    const squeeze = (pulse - 0.5) * current;
    const isStructuredTentacle = particle.feature === "jellyTentacle" || particle.feature === "jellyOralArm";

    if (isStructuredTentacle) {
      const phase = prefersReducedMotion.matches ? 0 : time * (0.8 + current * 0.7);
      const local =
        particle.feature === "jellyOralArm"
          ? jellyfishOralArmLocal(particle.strandIndex, particle.strandT, phase * 1.25)
          : jellyfishTentacleLocal(particle.strandIndex, particle.strandT, phase);
      const point = maskPointToView(jellyfishLocalToMask(local.x, local.y));
      const driftY = Math.sin(time * 0.9) * 24 * current;
      targetX = point.x + ambientX * 0.16;
      targetY = point.y + driftY + ambientY * 0.12;
      targetZ +=
        particle.strandT * 0.34 +
        Math.sin(time * 1.2 + particle.strandIndex * 0.8) * 0.18 * current;
      rotation = Math.sin(time * 1.3 + particle.strandIndex) * 0.08 * current;
      alphaScale = particle.feature === "jellyOralArm" ? 0.92 : 1.18;
      sizeScale = particle.feature === "jellyOralArm" ? 0.76 : 0.64 + particle.strandT * 0.22;
    } else {
      const relX = particle.relX * (1 + squeeze * 0.16 * bell - squeeze * 0.04 * tentacle);
      const relY = particle.relY * (1 - squeeze * 0.1 * bell + squeeze * 0.14 * tentacle);
      targetX =
        particle.centerX +
        relX +
        Math.sin(time * 1.65 + particle.normY * 5.8 + particle.seed) * tentacle * 18 * current +
        ambientX;
      targetY =
        particle.centerY +
        relY +
        Math.sin(time * 0.9) * 28 * current -
        pulse * bell * 18 * current +
        ambientY;
      targetZ += bell * (0.32 + pulse * 0.4) + tentacle * Math.sin(time * 1.9 + particle.seed) * 0.2 * current;
      alphaScale = 0.88 + bell * 0.2;
      sizeScale = 0.82 + pulse * 0.3 * bell;
    }
  } else if (shape === "butterfly") {
    const localX = particle.normX * 450;
    const localY = particle.normY * 280;
    const butterfly = butterflyLocalToView(localX, localY, time, current);
    targetX = butterfly.x + ambientX * 0.38;
    targetY = butterfly.y + ambientY * 0.32;
    targetZ += butterfly.wing * butterfly.pose.fold * 1.06 + butterfly.outerWing * butterfly.pose.beat * 0.16 * current;
    targetZ += (1 - butterfly.wing) * 0.24;
    rotation += butterfly.side * butterfly.pose.beat * butterfly.wing * 0.2 * current;
    sizeScale = 0.9 + butterfly.wing * butterfly.pose.fold * 0.24;
  } else {
    const shimmer = Math.sin(time * 1.6 + particle.seed) * current;
    targetX += ambientX + shimmer * 7;
    targetY += ambientY + Math.cos(time * 1.1 + particle.shift) * 7 * current;
    targetZ += shimmer * 0.35 + Math.sin(time * 0.7 + particle.normX * 2) * 0.18 * current;
    sizeScale = 0.9 + Math.abs(shimmer) * 0.22;
  }

  return { targetX, targetY, targetZ, alphaScale, sizeScale, rotation };
}

function projectParticle(particle) {
  const depth = clamp(particle.z, -1.15, 1.15);
  const perspective = 1 + depth * 0.16;
  const x = particle.centerX + (particle.x - particle.centerX) * perspective;
  const y = particle.centerY + (particle.y - particle.centerY) * (1 + depth * 0.09) - depth * 12;

  return {
    x,
    y,
    depth,
    scale: 0.78 + (depth + 1.15) * 0.2,
    alpha: 0.52 + (depth + 1.15) * 0.23,
    shadowOffset: 5 + (depth + 1.15) * 7,
  };
}

function maskPointToView(point) {
  return {
    x: maskPlacement.offsetX + point.x * maskPlacement.scale,
    y: maskPlacement.offsetY + point.y * maskPlacement.scale,
  };
}

function drawJellyfishGuides(time) {
  if (state.uploadedImage || state.shape !== "jellyfish") return;

  const phase = prefersReducedMotion.matches ? 0 : time * (0.8 + state.current * 0.7);

  ctx.save();
  ctx.strokeStyle = "#16265e";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < JELLYFISH_TENTACLE_COUNT; i += 1) {
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = Math.max(0.7, maskPlacement.scale * 2.6);
    ctx.beginPath();

    for (let step = 0; step <= 18; step += 1) {
      const t = step / 18;
      const local = jellyfishTentacleLocal(i, t, phase);
      const point = maskPointToView(jellyfishLocalToMask(local.x, local.y));
      if (step === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    ctx.stroke();
  }

  for (let i = 0; i < JELLYFISH_ORAL_ARM_COUNT; i += 1) {
    ctx.globalAlpha = 0.16;
    ctx.lineWidth = Math.max(1.2, maskPlacement.scale * 5.2);
    ctx.beginPath();

    for (let step = 0; step <= 18; step += 1) {
      const t = step / 18;
      const local = jellyfishOralArmLocal(i, t, phase * 1.25);
      const point = maskPointToView(jellyfishLocalToMask(local.x, local.y));
      if (step === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    ctx.stroke();
  }

  ctx.restore();
}

function drawCastShadow(drawItem) {
  const { particle, projection, sizeScale } = drawItem;
  const size = particle.size * sizeScale * projection.scale;
  const radius = Math.max(1.2, size * 0.44);
  const shadowAlpha = Math.max(0.02, 0.1 - projection.depth * 0.03);

  ctx.save();
  ctx.globalAlpha = shadowAlpha;
  ctx.fillStyle = "#16265e";
  ctx.translate(projection.x + projection.shadowOffset, projection.y + projection.shadowOffset * 0.74);
  ctx.scale(1.75, 0.58);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSparkle(particle, time, alpha, sizeScale, rotation) {
  const size = particle.size * sizeScale;
  const arm = size * 1.35;
  const shortArm = size * 0.62;

  ctx.save();
  ctx.translate(particle.drawX ?? particle.x, particle.drawY ?? particle.y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#16265e";
  ctx.fillStyle = "#16265e";
  ctx.lineWidth = Math.max(0.7, size * 0.12);

  if (particle.mark === "pin") {
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0.9, size * 0.24), 0, Math.PI * 2);
    ctx.fill();
  } else if (particle.mark === "dash") {
    ctx.beginPath();
    ctx.moveTo(-arm * 0.52, 0);
    ctx.lineTo(arm * 0.52, 0);
    ctx.stroke();
  } else if (particle.mark === "diamond") {
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.58);
    ctx.lineTo(size * 0.42, 0);
    ctx.lineTo(0, size * 0.58);
    ctx.lineTo(-size * 0.42, 0);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(-arm, 0);
    ctx.lineTo(arm, 0);
    ctx.moveTo(0, -arm);
    ctx.lineTo(0, arm);
    ctx.moveTo(-shortArm, -shortArm);
    ctx.lineTo(shortArm, shortArm);
    ctx.moveTo(shortArm, -shortArm);
    ctx.lineTo(-shortArm, shortArm);
    ctx.stroke();
  }

  ctx.restore();
}

function drawParticle(particle, time, alpha, sizeScale, rotation) {
  const size = particle.size * sizeScale;
  const radius = Math.max(1.1, size * 0.33);
  const tail = Math.max(2, size * 0.7);

  if (particle.feature === "jellyTentacle" || particle.feature === "jellyOralArm") {
    const isOralArm = particle.feature === "jellyOralArm";
    const strand = particle.strandIndex + 1;
    const length = size * (isOralArm ? 2.9 : 3.8 + particle.strandT * 2.8);
    const sway = Math.sin(time * 1.3 + strand * 0.9 + particle.strandT * 4) * size * 0.18;

    ctx.save();
    ctx.translate(particle.drawX ?? particle.x, particle.drawY ?? particle.y);
    ctx.globalAlpha = alpha * (isOralArm ? 0.46 : 0.72);
    ctx.strokeStyle = "#16265e";
    ctx.fillStyle = "#16265e";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(0.75, size * (isOralArm ? 0.18 : 0.13));
    ctx.beginPath();
    ctx.moveTo(0, -length * 0.24);
    ctx.quadraticCurveTo(sway, length * 0.26, 0, length);
    ctx.stroke();

    ctx.globalAlpha = alpha * 0.58;
    ctx.beginPath();
    ctx.arc(0, -length * 0.18, Math.max(0.65, radius * 0.58), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.translate(particle.drawX ?? particle.x, particle.drawY ?? particle.y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#16265e";
  ctx.strokeStyle = "#16265e";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  if (!prefersReducedMotion.matches && state.current > 0.08) {
    ctx.globalAlpha = alpha * 0.24;
    ctx.lineWidth = Math.max(0.7, radius * 0.42);
    ctx.beginPath();
    ctx.moveTo(-tail, 0);
    ctx.lineTo(-tail * (1.8 + state.current), 0);
    ctx.stroke();
  }

  ctx.restore();
}

function animate(now) {
  const time = now * 0.001;
  drawBackground(time);

  ctx.save();
  const drawQueue = [];

  for (const particle of particles) {
    const current = state.current;
    const motion = getParticleMotion(particle, time, current);
    let targetX = motion.targetX;
    let targetY = motion.targetY;
    let targetZ = motion.targetZ;

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const radius = state.shape === "butterfly" ? 132 : 118;
      if (dist < radius) {
        const force = (1 - dist / radius) * (state.shape === "butterfly" ? 64 : 58);
        targetX += (dx / dist) * force;
        targetY += (dy / dist) * force;
        targetZ += (1 - dist / radius) * 0.42;
      }
    }

    const spring = prefersReducedMotion.matches ? 1 : state.shape === "butterfly" ? 0.082 : 0.058;
    const damping = state.shape === "butterfly" ? 0.72 : 0.76;
    const zDamping = state.shape === "butterfly" ? 0.68 : 0.72;
    particle.vx = (particle.vx + (targetX - particle.x) * spring) * damping;
    particle.vy = (particle.vy + (targetY - particle.y) * spring) * damping;
    particle.vz = (particle.vz + (targetZ - particle.z) * spring) * zDamping;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.z += particle.vz;

    const twinkle = prefersReducedMotion.matches
      ? 0.82
      : 0.32 + Math.pow((Math.sin(time * particle.twinkleRate + particle.shift) + 1) / 2, 3) * 0.86;
    const projection = projectParticle(particle);
    const alpha = Math.min(
      0.94,
      Math.max(0.04, particle.alpha * twinkle * motion.alphaScale * projection.alpha),
    );
    drawQueue.push({
      particle,
      projection,
      alpha,
      sizeScale: motion.sizeScale * projection.scale,
      rotation: motion.rotation,
    });
  }

  drawQueue.sort((a, b) => a.projection.depth - b.projection.depth);

  for (const item of drawQueue) {
    drawCastShadow(item);
  }

  drawJellyfishGuides(time);

  for (const item of drawQueue) {
    const { particle, projection, alpha, sizeScale, rotation } = item;
    particle.drawX = projection.x;
    particle.drawY = projection.y;

    if (state.renderMode === "sparkle") {
      drawSparkle(particle, time, alpha, sizeScale, rotation);
    } else {
      drawParticle(particle, time, alpha, sizeScale, rotation);
    }

    particle.drawX = undefined;
    particle.drawY = undefined;
  }

  ctx.restore();
  requestAnimationFrame(animate);
}

function setShape(shape) {
  state.shape = shape;
  state.uploadedImage = null;
  state.uploadedName = "";

  shapeButtons.forEach((button) => {
    const isActive = button.dataset.shape === shape;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });

  buildParticles();
}

function handleUpload(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      state.uploadedImage = image;
      state.uploadedName = file.name.replace(/\.[^.]+$/, "");
      shapeButtons.forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-checked", "false");
      });
      buildParticles();
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

shapeButtons.forEach((button) => {
  button.addEventListener("click", () => setShape(button.dataset.shape));
});

renderSwitch.addEventListener("click", () => {
  state.renderMode = state.renderMode === "particle" ? "sparkle" : "particle";
  const isSparkle = state.renderMode === "sparkle";
  renderSwitch.classList.toggle("is-sparkle", isSparkle);
  renderSwitch.setAttribute("aria-checked", String(isSparkle));
  updateCaption();
});

densityRange.addEventListener("input", () => {
  state.density = Number(densityRange.value);
  buildParticles();
});

motionRange.addEventListener("input", () => {
  state.current = prefersReducedMotion.matches ? 0 : Number(motionRange.value) / 100;
  updateCaption();
});

thresholdRange.addEventListener("input", () => {
  state.threshold = Number(thresholdRange.value);
  if (state.uploadedImage) buildParticles();
});

uploadInput.addEventListener("change", (event) => {
  handleUpload(event.target.files[0]);
});

resetButton.addEventListener("click", () => {
  setShape("fish");
  uploadInput.value = "";
});

canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.active = true;
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
});

canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
});

window.addEventListener("resize", () => {
  window.clearTimeout(setupCanvas.resizeTimer);
  setupCanvas.resizeTimer = window.setTimeout(setupCanvas, 120);
});

prefersReducedMotion.addEventListener("change", () => {
  state.current = prefersReducedMotion.matches ? 0 : Number(motionRange.value) / 100;
  updateCaption();
});

setupCanvas();
requestAnimationFrame(animate);
