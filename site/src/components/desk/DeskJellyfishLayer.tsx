import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './DeskJellyfishLayer.module.css';

const INK = '#16265e';
const MASK_WIDTH = 900;
const MASK_HEIGHT = 560;
const DESK_PARTICLE_COUNT = 720;
const DESK_CURRENT = 0.64;
const DESK_SCALE = 0.34;
const SWIM_LOOP_SECONDS = 96;
const JELLYFISH_TENTACLE_COUNT = 14;
const JELLYFISH_ORAL_ARM_COUNT = 5;

type Feature = 'jellyBell' | 'jellyTentacle' | 'jellyOralArm';

type MaskPoint = {
  feature?: Feature;
  strandIndex?: number;
  strandT?: number;
  x: number;
  y: number;
};

type Particle = {
  alpha: number;
  baseZ: number;
  centerX: number;
  centerY: number;
  drawX?: number;
  drawY?: number;
  feature: Feature | '';
  homeX: number;
  homeY: number;
  normX: number;
  normY: number;
  relX: number;
  relY: number;
  seed: number;
  shift: number;
  size: number;
  spin: number;
  spinSpeed: number;
  strandIndex: number;
  strandT: number;
  twinkleRate: number;
  vx: number;
  vy: number;
  vz: number;
  x: number;
  y: number;
  z: number;
};

type View = {
  height: number;
  width: number;
};

type MaskPlacement = {
  offsetX: number;
  offsetY: number;
  scale: number;
};

type DrawItem = {
  alpha: number;
  particle: Particle;
  projection: ReturnType<typeof projectParticle>;
  rotation: number;
  sizeScale: number;
};

type Point = {
  x: number;
  y: number;
};

type Bounds = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const FALLBACK_MASK_BOUNDS: Bounds = {
  x: 210,
  y: 0,
  width: 480,
  height: 540,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};

const jellyfishLocalToMask = (x: number, y: number): Point => {
  const rotation = -0.05;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return {
    x: 450 + x * cos - y * sin,
    y: 560 * 0.34 + x * sin + y * cos,
  };
};

const jellyfishTentacleLocal = (strandIndex: number, t: number, phase = 0): Point => {
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
};

const jellyfishOralArmLocal = (armIndex: number, t: number, phase = 0): Point => {
  const startX = -48 + armIndex * 24;
  const seed = armIndex * 1.31;
  const y = 42 + t * (282 + (armIndex % 2) * 24);
  const drift = Math.sin(t * Math.PI * 2.1 + seed + phase) * (10 + t * 18);

  return {
    x: startX + drift,
    y,
  };
};

const traceJellyfishBell = (context: CanvasRenderingContext2D) => {
  context.beginPath();
  context.moveTo(-222, 42);
  context.bezierCurveTo(-204, -96, -96, -186, 34, -190);
  context.bezierCurveTo(164, -190, 242, -86, 224, 40);

  for (let x = 190; x >= -190; x -= 38) {
    context.quadraticCurveTo(x - 19, 82, x - 38, 46 + Math.sin(x * 0.08) * 4);
  }

  context.closePath();
};

const drawJellyfishBellMask = (
  context: CanvasRenderingContext2D,
  maskCanvas: HTMLCanvasElement,
) => {
  maskCanvas.width = MASK_WIDTH;
  maskCanvas.height = MASK_HEIGHT;
  context.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT);
  context.fillStyle = '#000';
  context.save();
  context.translate(MASK_WIDTH * 0.5, MASK_HEIGHT * 0.34);
  context.rotate(-0.05);
  traceJellyfishBell(context);
  context.fill();
  context.restore();
};

const drawJellyfishHitMask = (
  context: CanvasRenderingContext2D,
  maskCanvas: HTMLCanvasElement,
) => {
  maskCanvas.width = MASK_WIDTH;
  maskCanvas.height = MASK_HEIGHT;
  context.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT);
  context.fillStyle = '#000';
  context.strokeStyle = '#000';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.save();
  context.translate(MASK_WIDTH * 0.5, MASK_HEIGHT * 0.34);
  context.rotate(-0.05);
  traceJellyfishBell(context);
  context.fill();
  context.restore();

  context.lineWidth = 18;
  for (let index = 0; index < JELLYFISH_TENTACLE_COUNT; index += 1) {
    context.beginPath();
    for (let step = 0; step <= 18; step += 1) {
      const local = jellyfishTentacleLocal(index, step / 18);
      const point = jellyfishLocalToMask(local.x, local.y);
      if (step === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.stroke();
  }

  context.lineWidth = 28;
  for (let index = 0; index < JELLYFISH_ORAL_ARM_COUNT; index += 1) {
    context.beginPath();
    for (let step = 0; step <= 18; step += 1) {
      const local = jellyfishOralArmLocal(index, step / 18);
      const point = jellyfishLocalToMask(local.x, local.y);
      if (step === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.stroke();
  }
};

const sampleJellyfishBellPoints = (
  count: number,
  maskCanvas: HTMLCanvasElement,
  maskContext: CanvasRenderingContext2D,
): MaskPoint[] => {
  drawJellyfishBellMask(maskContext, maskCanvas);
  const data = maskContext.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT).data;
  const points: MaskPoint[] = [];
  const maxAttempts = count * 80;
  let attempts = 0;

  while (points.length < count && attempts < maxAttempts) {
    attempts += 1;
    const x = Math.floor(Math.random() * MASK_WIDTH);
    const y = Math.floor(Math.random() * MASK_HEIGHT);
    const alpha = data[(y * MASK_WIDTH + x) * 4 + 3];

    if (alpha > 60) {
      points.push({ x, y, feature: 'jellyBell' });
    }
  }

  return points;
};

const sampleJellyfishCurvePoints = (
  count: number,
  curveCount: number,
  pointFactory: (index: number, t: number) => Point,
  feature: Feature,
): MaskPoint[] => {
  const points: MaskPoint[] = [];

  for (let index = 0; index < count; index += 1) {
    const curveIndex = index % curveCount;
    const t = Math.pow((index + Math.random()) / count, 0.78);
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
};

const sampleJellyfishPoints = (
  count: number,
  maskCanvas: HTMLCanvasElement,
  maskContext: CanvasRenderingContext2D,
) => {
  const bellCount = Math.round(count * 0.64);
  const oralArmCount = Math.round(count * 0.14);
  const tentacleCount = count - bellCount - oralArmCount;

  return [
    ...sampleJellyfishBellPoints(bellCount, maskCanvas, maskContext),
    ...sampleJellyfishCurvePoints(
      tentacleCount,
      JELLYFISH_TENTACLE_COUNT,
      jellyfishTentacleLocal,
      'jellyTentacle',
    ),
    ...sampleJellyfishCurvePoints(
      oralArmCount,
      JELLYFISH_ORAL_ARM_COUNT,
      jellyfishOralArmLocal,
      'jellyOralArm',
    ),
  ];
};

const getPlacement = (view: View): MaskPlacement => {
  const scale = Math.min(view.width / MASK_WIDTH, view.height / MASK_HEIGHT) * DESK_SCALE;
  const centerX = view.width * 0.5;
  const centerY = view.height * 0.43;

  return {
    scale,
    offsetX: centerX - (MASK_WIDTH * scale) / 2,
    offsetY: centerY - (MASK_HEIGHT * scale) / 2,
  };
};

const getSwimOffset = (view: View, placement: MaskPlacement, time: number, reducedMotion: boolean): Point => {
  if (reducedMotion) {
    return { x: 0, y: 0 };
  }

  const jellyWidth = MASK_WIDTH * placement.scale;
  const jellyHeight = MASK_HEIGHT * placement.scale;
  const xRange = Math.max(0, (view.width - jellyWidth) / 2);
  const yRange = Math.max(0, (view.height - jellyHeight) / 2);

  return {
    x:
      Math.sin(time * 0.075 - Math.PI / 2) * xRange * 0.78 +
      Math.sin(time * 0.19 + 0.4) * xRange * 0.13,
    y: Math.sin(time * 0.11 - 0.9) * yRange * 0.38 + Math.sin(time * 0.27 + 2.4) * yRange * 0.09,
  };
};

const getMaskAlphaBounds = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): Bounds => {
  const data = context.getImageData(0, 0, width, height).data;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha <= 40) {
        continue;
      }

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) {
    return FALLBACK_MASK_BOUNDS;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
};

const getCardBounds = (
  placement: MaskPlacement,
  swimOffset: Point,
  maskBounds: Bounds,
): Bounds => {
  const padding = Math.max(10, Math.min(18, placement.scale * 36));

  return {
    x: placement.offsetX + swimOffset.x + maskBounds.x * placement.scale - padding,
    y: placement.offsetY + swimOffset.y + maskBounds.y * placement.scale - padding,
    width: maskBounds.width * placement.scale + padding * 2,
    height: maskBounds.height * placement.scale + padding * 2,
  };
};

const isPointInBounds = (point: Point, bounds: Bounds) =>
  point.x >= bounds.x &&
  point.x <= bounds.x + bounds.width &&
  point.y >= bounds.y &&
  point.y <= bounds.y + bounds.height;

const traceRoundedRect = (context: CanvasRenderingContext2D, bounds: Bounds, radius: number) => {
  const r = Math.min(radius, bounds.width / 2, bounds.height / 2);
  const right = bounds.x + bounds.width;
  const bottom = bounds.y + bounds.height;

  context.beginPath();
  context.moveTo(bounds.x + r, bounds.y);
  context.lineTo(right - r, bounds.y);
  context.quadraticCurveTo(right, bounds.y, right, bounds.y + r);
  context.lineTo(right, bottom - r);
  context.quadraticCurveTo(right, bottom, right - r, bottom);
  context.lineTo(bounds.x + r, bottom);
  context.quadraticCurveTo(bounds.x, bottom, bounds.x, bottom - r);
  context.lineTo(bounds.x, bounds.y + r);
  context.quadraticCurveTo(bounds.x, bounds.y, bounds.x + r, bounds.y);
  context.closePath();
};

const drawHoverCard = (context: CanvasRenderingContext2D, bounds: Bounds) => {
  context.save();
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = 'rgba(235, 230, 217, 0.74)';
  context.strokeStyle = 'rgba(22, 38, 94, 0.24)';
  context.lineWidth = 1;
  traceRoundedRect(context, bounds, 6);
  context.fill();
  context.stroke();
  context.restore();
};

const maskPointToView = (point: Point, placement: MaskPlacement): Point => ({
  x: placement.offsetX + point.x * placement.scale,
  y: placement.offsetY + point.y * placement.scale,
});

const buildParticles = (
  view: View,
  previous: Particle[],
  reducedMotion: boolean,
  maskCanvas: HTMLCanvasElement,
  maskContext: CanvasRenderingContext2D,
) => {
  const placement = getPlacement(view);
  const maskPoints = sampleJellyfishPoints(DESK_PARTICLE_COUNT, maskCanvas, maskContext);
  const centerX = placement.offsetX + (MASK_WIDTH * placement.scale) / 2;
  const centerY = placement.offsetY + (MASK_HEIGHT * placement.scale) / 2;

  const particles = maskPoints.map<Particle>((point, index) => {
    const old = previous[index % Math.max(1, previous.length)];
    const homeX = placement.offsetX + point.x * placement.scale;
    const homeY = placement.offsetY + point.y * placement.scale;
    const seed = Math.random() * 1000;
    const relX = homeX - centerX;
    const relY = homeY - centerY;
    const feature: Feature | '' = point.feature ?? '';

    return {
      homeX,
      homeY,
      centerX,
      centerY,
      relX,
      relY,
      normX: (point.x / MASK_WIDTH - 0.5) * 2,
      normY: (point.y / MASK_HEIGHT - 0.5) * 2,
      feature,
      strandIndex: point.strandIndex ?? 0,
      strandT: point.strandT ?? 0,
      x: reducedMotion
        ? homeX
        : old
          ? old.x
          : homeX + (Math.random() - 0.5) * view.width * 0.18,
      y: reducedMotion
        ? homeY
        : old
          ? old.y
          : homeY + (Math.random() - 0.5) * view.height * 0.18,
      vx: old ? old.vx : 0,
      vy: old ? old.vy : 0,
      z: reducedMotion ? 0 : old ? old.z : (Math.random() - 0.5) * 0.7,
      vz: old ? old.vz : 0,
      baseZ: (Math.random() - 0.5) * 0.72,
      seed,
      size: 2.6 + Math.random() * 6.2,
      alpha: 0.18 + Math.random() * 0.58,
      shift: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.7,
      twinkleRate: 1.8 + Math.random() * 3.6,
    };
  });

  drawJellyfishHitMask(maskContext, maskCanvas);
  const maskBounds = getMaskAlphaBounds(maskContext, MASK_WIDTH, MASK_HEIGHT);

  return {
    maskBounds,
    particles,
    placement,
  };
};

const getParticleMotion = (
  particle: Particle,
  time: number,
  current: number,
  placement: MaskPlacement,
  reducedMotion: boolean,
) => {
  const tentacle = smoothstep(-0.04, 0.96, particle.normY);
  const bell = 1 - smoothstep(-0.62, 0.2, particle.normY);
  const pulse = (Math.sin(time * (1.8 + current * 1.05)) + 1) / 2;
  const squeeze = (pulse - 0.5) * current;
  const isStructuredTentacle =
    particle.feature === 'jellyTentacle' || particle.feature === 'jellyOralArm';
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

  if (isStructuredTentacle) {
    const phase = reducedMotion ? 0 : time * (0.8 + current * 0.7);
    const local =
      particle.feature === 'jellyOralArm'
        ? jellyfishOralArmLocal(particle.strandIndex, particle.strandT, phase * 1.25)
        : jellyfishTentacleLocal(particle.strandIndex, particle.strandT, phase);
    const point = maskPointToView(jellyfishLocalToMask(local.x, local.y), placement);
    const driftY = Math.sin(time * 0.9) * 24 * current;
    targetX = point.x + ambientX * 0.16;
    targetY = point.y + driftY + ambientY * 0.12;
    targetZ +=
      particle.strandT * 0.34 +
      Math.sin(time * 1.2 + particle.strandIndex * 0.8) * 0.18 * current;
    rotation = Math.sin(time * 1.3 + particle.strandIndex) * 0.08 * current;
    alphaScale = particle.feature === 'jellyOralArm' ? 0.92 : 1.18;
    sizeScale = particle.feature === 'jellyOralArm' ? 0.76 : 0.64 + particle.strandT * 0.22;
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
    targetZ +=
      bell * (0.32 + pulse * 0.4) +
      tentacle * Math.sin(time * 1.9 + particle.seed) * 0.2 * current;
    alphaScale = 0.88 + bell * 0.2;
    sizeScale = 0.82 + pulse * 0.3 * bell;
  }

  return { alphaScale, rotation, sizeScale, targetX, targetY, targetZ };
};

function projectParticle(particle: Particle) {
  const depth = clamp(particle.z, -1.15, 1.15);
  const perspective = 1 + depth * 0.16;
  const x = particle.centerX + (particle.x - particle.centerX) * perspective;
  const y = particle.centerY + (particle.y - particle.centerY) * (1 + depth * 0.09) - depth * 12;

  return {
    alpha: 0.52 + (depth + 1.15) * 0.23,
    depth,
    scale: 0.78 + (depth + 1.15) * 0.2,
    shadowOffset: 5 + (depth + 1.15) * 7,
    x,
    y,
  };
}

const drawJellyfishGuides = (
  context: CanvasRenderingContext2D,
  time: number,
  current: number,
  placement: MaskPlacement,
  reducedMotion: boolean,
) => {
  const phase = reducedMotion ? 0 : time * (0.8 + current * 0.7);

  context.save();
  context.strokeStyle = INK;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  for (let index = 0; index < JELLYFISH_TENTACLE_COUNT; index += 1) {
    context.globalAlpha = 0.2;
    context.lineWidth = Math.max(0.7, placement.scale * 2.6);
    context.beginPath();

    for (let step = 0; step <= 18; step += 1) {
      const local = jellyfishTentacleLocal(index, step / 18, phase);
      const point = maskPointToView(jellyfishLocalToMask(local.x, local.y), placement);

      if (step === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }

    context.stroke();
  }

  for (let index = 0; index < JELLYFISH_ORAL_ARM_COUNT; index += 1) {
    context.globalAlpha = 0.16;
    context.lineWidth = Math.max(1.2, placement.scale * 5.2);
    context.beginPath();

    for (let step = 0; step <= 18; step += 1) {
      const local = jellyfishOralArmLocal(index, step / 18, phase * 1.25);
      const point = maskPointToView(jellyfishLocalToMask(local.x, local.y), placement);

      if (step === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }

    context.stroke();
  }

  context.restore();
};

const drawCastShadow = (context: CanvasRenderingContext2D, drawItem: DrawItem) => {
  const { particle, projection, sizeScale } = drawItem;
  const size = particle.size * sizeScale * projection.scale;
  const radius = Math.max(1.2, size * 0.44);
  const shadowAlpha = Math.max(0.02, 0.1 - projection.depth * 0.03);

  context.save();
  context.globalAlpha = shadowAlpha;
  context.fillStyle = INK;
  context.translate(projection.x + projection.shadowOffset, projection.y + projection.shadowOffset * 0.74);
  context.scale(1.75, 0.58);
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: Particle,
  time: number,
  alpha: number,
  sizeScale: number,
  rotation: number,
  current: number,
  reducedMotion: boolean,
) => {
  const size = particle.size * sizeScale;
  const radius = Math.max(1.1, size * 0.33);
  const tail = Math.max(2, size * 0.7);

  if (particle.feature === 'jellyTentacle' || particle.feature === 'jellyOralArm') {
    const isOralArm = particle.feature === 'jellyOralArm';
    const strand = particle.strandIndex + 1;
    const length = size * (isOralArm ? 2.9 : 3.8 + particle.strandT * 2.8);
    const sway = Math.sin(time * 1.3 + strand * 0.9 + particle.strandT * 4) * size * 0.18;

    context.save();
    context.translate(particle.drawX ?? particle.x, particle.drawY ?? particle.y);
    context.globalAlpha = alpha * (isOralArm ? 0.46 : 0.72);
    context.strokeStyle = INK;
    context.fillStyle = INK;
    context.lineCap = 'round';
    context.lineWidth = Math.max(0.75, size * (isOralArm ? 0.18 : 0.13));
    context.beginPath();
    context.moveTo(0, -length * 0.24);
    context.quadraticCurveTo(sway, length * 0.26, 0, length);
    context.stroke();

    context.globalAlpha = alpha * 0.58;
    context.beginPath();
    context.arc(0, -length * 0.18, Math.max(0.65, radius * 0.58), 0, Math.PI * 2);
    context.fill();
    context.restore();
    return;
  }

  context.save();
  context.translate(particle.drawX ?? particle.x, particle.drawY ?? particle.y);
  context.rotate(rotation);
  context.globalAlpha = alpha;
  context.fillStyle = INK;
  context.strokeStyle = INK;
  context.lineCap = 'round';

  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  if (!reducedMotion && current > 0.08) {
    context.globalAlpha = alpha * 0.24;
    context.lineWidth = Math.max(0.7, radius * 0.42);
    context.beginPath();
    context.moveTo(-tail, 0);
    context.lineTo(-tail * (1.8 + current), 0);
    context.stroke();
  }

  context.restore();
};

const drawFrame = (
  context: CanvasRenderingContext2D,
  particles: Particle[],
  view: View,
  placement: MaskPlacement,
  swimOffset: Point,
  hoverCardBounds: Bounds | null,
  time: number,
  current: number,
  reducedMotion: boolean,
  simulate: boolean,
) => {
  context.clearRect(0, 0, view.width, view.height);

  if (hoverCardBounds) {
    drawHoverCard(context, hoverCardBounds);
  }

  context.save();
  context.translate(swimOffset.x, swimOffset.y);
  context.globalCompositeOperation = 'multiply';

  const drawQueue: DrawItem[] = [];

  for (const particle of particles) {
    const motion = getParticleMotion(particle, time, current, placement, reducedMotion);

    if (simulate) {
      const spring = reducedMotion ? 1 : 0.058;
      const damping = 0.76;
      const zDamping = 0.72;
      particle.vx = (particle.vx + (motion.targetX - particle.x) * spring) * damping;
      particle.vy = (particle.vy + (motion.targetY - particle.y) * spring) * damping;
      particle.vz = (particle.vz + (motion.targetZ - particle.z) * spring) * zDamping;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
    }

    const twinkle = reducedMotion
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
    drawCastShadow(context, item);
  }

  drawJellyfishGuides(context, time, current, placement, reducedMotion);

  for (const item of drawQueue) {
    const { particle, projection, alpha, sizeScale, rotation } = item;
    particle.drawX = projection.x;
    particle.drawY = projection.y;
    drawParticle(context, particle, time, alpha, sizeScale, rotation, current, reducedMotion);
    particle.drawX = undefined;
    particle.drawY = undefined;
  }

  context.restore();
};

const isDeskSlotTarget = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-desk-slot]'));

const getCanvasPoint = (canvas: HTMLCanvasElement, event: MouseEvent | PointerEvent): Point => {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const hitTest = (
  x: number,
  y: number,
  placement: MaskPlacement,
  swimOffset: Point,
  maskContext: CanvasRenderingContext2D,
) => {
  const maskX = Math.round((x - swimOffset.x - placement.offsetX) / placement.scale);
  const maskY = Math.round((y - swimOffset.y - placement.offsetY) / placement.scale);

  if (maskX < 0 || maskX >= MASK_WIDTH || maskY < 0 || maskY >= MASK_HEIGHT) {
    return false;
  }

  return maskContext.getImageData(maskX, maskY, 1, 1).data[3] > 40;
};

export default function DeskJellyfishLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const placementRef = useRef<MaskPlacement>({ offsetX: 0, offsetY: 0, scale: 1 });
  const viewRef = useRef<View>({ height: 0, width: 0 });
  const maskBoundsRef = useRef<Bounds>(FALLBACK_MASK_BOUNDS);
  const timeRef = useRef(0);
  const swimTimeRef = useRef(Math.random() * SWIM_LOOP_SECONDS);
  const hoverRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !layer || !context) {
      return undefined;
    }

    const maskCanvas = document.createElement('canvas');
    const maskContext = maskCanvas.getContext('2d', { willReadFrequently: true });
    const scene = layer.parentElement;

    if (!maskContext) {
      return undefined;
    }

    let frame = 0;
    let lastFrame = performance.now();
    let cursorActive = false;

    const setHover = (nextHover: boolean) => {
      hoverRef.current = nextHover;

      if (cursorActive !== nextHover) {
        cursorActive = nextHover;
        document.documentElement.style.cursor = nextHover ? 'pointer' : '';
      }
    };

    const rebuildParticles = () => {
      const result = buildParticles(
        viewRef.current,
        particlesRef.current,
        reducedMotion,
        maskCanvas,
        maskContext,
      );
      particlesRef.current = result.particles;
      placementRef.current = result.placement;
      maskBoundsRef.current = result.maskBounds;
    };

    const getFrameState = () => {
      const swimOffset = getSwimOffset(
        viewRef.current,
        placementRef.current,
        swimTimeRef.current,
        reducedMotion,
      );
      const cardBounds = getCardBounds(
        placementRef.current,
        swimOffset,
        maskBoundsRef.current,
      );

      return { cardBounds, swimOffset };
    };

    const syncSize = () => {
      const rect = layer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      viewRef.current = { width, height };
      rebuildParticles();
      const { cardBounds, swimOffset } = getFrameState();
      drawFrame(
        context,
        particlesRef.current,
        viewRef.current,
        placementRef.current,
        swimOffset,
        hoverRef.current ? cardBounds : null,
        timeRef.current,
        reducedMotion ? 0 : DESK_CURRENT,
        reducedMotion,
        !reducedMotion,
      );
    };

    const draw = (now: number) => {
      const elapsed = Math.min(0.04, (now - lastFrame) / 1000);
      lastFrame = now;

      if (!reducedMotion) {
        timeRef.current += elapsed;
      }

      if (!hoverRef.current && !reducedMotion) {
        swimTimeRef.current += elapsed;
      }

      const { cardBounds, swimOffset } = getFrameState();
      drawFrame(
        context,
        particlesRef.current,
        viewRef.current,
        placementRef.current,
        swimOffset,
        hoverRef.current ? cardBounds : null,
        timeRef.current,
        reducedMotion ? 0 : DESK_CURRENT,
        reducedMotion,
        !reducedMotion,
      );
      frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: MouseEvent | PointerEvent) => {
      if (isDeskSlotTarget(event.target)) {
        setHover(false);
        return;
      }

      const point = getCanvasPoint(canvas, event);
      const { cardBounds, swimOffset } = getFrameState();
      const maskHit = hitTest(point.x, point.y, placementRef.current, swimOffset, maskContext);
      const cardHit = hoverRef.current && isPointInBounds(point, cardBounds);
      setHover(maskHit || cardHit);
    };

    const handlePointerLeave = () => {
      setHover(false);
    };

    const handleClick = (event: MouseEvent) => {
      if (isDeskSlotTarget(event.target)) {
        return;
      }

      const point = getCanvasPoint(canvas, event);
      const { cardBounds, swimOffset } = getFrameState();
      const maskHit = hitTest(point.x, point.y, placementRef.current, swimOffset, maskContext);
      const cardHit = hoverRef.current && isPointInBounds(point, cardBounds);

      if (!maskHit && !cardHit) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign('/experiments/data-specimen/');
    };

    const observer = new ResizeObserver(syncSize);
    observer.observe(layer);
    syncSize();

    scene?.addEventListener('pointermove', handlePointerMove);
    scene?.addEventListener('mousemove', handlePointerMove);
    scene?.addEventListener('pointerleave', handlePointerLeave);
    scene?.addEventListener('click', handleClick);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      scene?.removeEventListener('pointermove', handlePointerMove);
      scene?.removeEventListener('mousemove', handlePointerMove);
      scene?.removeEventListener('pointerleave', handlePointerLeave);
      scene?.removeEventListener('click', handleClick);

      if (cursorActive) {
        document.documentElement.style.cursor = '';
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={styles.layer}
      data-desk-support="jellyfish"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
