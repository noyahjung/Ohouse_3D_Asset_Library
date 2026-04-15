// ─────────────────────────────────────────────────────────────
// 3D Asset Library — Shared Material Palette
// ─────────────────────────────────────────────────────────────
// Single source of truth for the visual language. Import from
// here — do NOT redefine materials or colors inline in scenes.

import * as THREE from 'three';

// ── Color tokens ─────────────────────────────────────────────
export const COLORS = {
  // Frosted Blue — top (cool white) → bottom (saturated blue)
  frostedBlueTop:    '#EBEFFF',
  frostedBlueBottom: '#00a1ff',

  // Frosted Green — mirrored curve with a fresh mint→green
  frostedGreenTop:    '#EDFFF4',
  frostedGreenBottom: '#00B26B',

  // Pure luminance white — unaffected by scene lighting
  luminanceWhite:    '#FFFFFF',
};

// ── Frozen preset: the tuned physical parameters shared by every
// "Frosted ___" material. Only the gradient colors differ per variant.
export const FROSTED_PRESET = Object.freeze({
  roughness:           0.53,
  metalness:           0.0,
  transmission:        0.34,
  thickness:           2.23,
  ior:                 1.45,
  attenuationDistance: 2.56,
  clearcoat:           0.39,
  clearcoatRoughness:  0.51,
  specularIntensity:   0.0,
  envMapIntensity:     0.4,
  gradientStrength:    1.0,
});

// ── Variant registry — maps a palette id to its gradient stops.
// Add new frosted variants here; `createFrosted(id)` picks them up.
export const FROSTED_VARIANTS = {
  frostedBlue: {
    label:  'Frosted Blue',
    top:    COLORS.frostedBlueTop,
    bottom: COLORS.frostedBlueBottom,
  },
  frostedGreen: {
    label:  'Frosted Green',
    top:    COLORS.frostedGreenTop,
    bottom: COLORS.frostedGreenBottom,
  },
};

// ── Gradient texture builder ─────────────────────────────────
export function makeVerticalGradient(topHex, bottomHex, strength = 1.0) {
  const w = 8, h = 1024;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const shift = (1.0 - strength) * 0.25;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(Math.max(0, shift),            topHex);
  g.addColorStop(Math.min(1, 1 - shift * 0.3),  bottomHex);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

// ── Generic frosted factory ──────────────────────────────────
/**
 * Build a MeshPhysicalMaterial using the shared FROSTED_PRESET
 * physical params with the gradient / attenuation color of the
 * requested variant. Overrides let scenes tune per-instance.
 */
export function createFrosted(variantId, overrides = {}) {
  const variant = FROSTED_VARIANTS[variantId];
  if (!variant) throw new Error(`Unknown frosted variant: ${variantId}`);
  const params = { ...FROSTED_PRESET, ...overrides };
  const map = makeVerticalGradient(variant.top, variant.bottom, params.gradientStrength);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map,
    roughness:           params.roughness,
    metalness:           params.metalness,
    transmission:        params.transmission,
    thickness:           params.thickness,
    ior:                 params.ior,
    attenuationColor:    new THREE.Color(variant.bottom),
    attenuationDistance: params.attenuationDistance,
    clearcoat:           params.clearcoat,
    clearcoatRoughness:  params.clearcoatRoughness,
    specularIntensity:   params.specularIntensity,
    envMapIntensity:     params.envMapIntensity,
  });
  mat.userData.paletteId = variantId;
  mat.userData.variant   = variant;
  return mat;
}

// Convenience wrappers
export const createFrostedBlue  = (overrides) => createFrosted('frostedBlue',  overrides);
export const createFrostedGreen = (overrides) => createFrosted('frostedGreen', overrides);

// ── White (Luminance) ────────────────────────────────────────
/**
 * Pure emissive white — ignores lights, shadows, environment maps.
 * Equivalent to a C4D/Redshift Luminance-only material.
 */
export function createLuminanceWhite() {
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(COLORS.luminanceWhite),
    toneMapped: false,
    // Ensure the emblem sits on top of the transmissive body surface
    // instead of getting buried by z-fighting / refraction passes.
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  mat.userData.paletteId = 'luminanceWhite';
  return mat;
}

// ── Glass (built-in, not in palette) ─────────────────────────
/**
 * Light translucent glass with subtle roughness. Used for cup / water
 * parts of the purifier. Thin walls, high transmission, tiny tint.
 */
export function createGlass() {
  // Alpha-blended frosted glass. We deliberately avoid `transmission`
  // because that relies on closed-volume refraction sampling — thin /
  // single-sided cup meshes render as solid gray under transmission.
  // Plain `transparent + opacity` reliably lets the background show
  // through regardless of mesh topology, and `roughness` still gives
  // the surface the soft frosty read.
  const mat = new THREE.MeshPhysicalMaterial({
    color:               0xffffff,
    roughness:           0.35,
    metalness:           0.0,
    transparent:         true,
    opacity:             0.32,
    clearcoat:           0.9,
    clearcoatRoughness:  0.08,
    specularIntensity:   1.4,
    envMapIntensity:     1.6,
    side:                THREE.DoubleSide,
    depthWrite:          false,
  });
  mat.userData.paletteId = 'glass';
  return mat;
}

// ── Chrome (built-in, not in palette) ────────────────────────
/**
 * Slightly brushed chrome — full metalness with a bit of roughness so
 * it doesn't mirror the scene perfectly. Used for the purifier's
 * cylinder (spout / nozzle).
 */
// ── Frozen Chrome preset ─────────────────────────────────────
// Locked defaults — the system-wide chrome token. Not user-editable:
// any asset that maps a mesh to `chrome` will inherit these values.
export const CHROME_PRESET = Object.freeze({
  color:             0xffffff,
  roughness:         0.28,
  metalness:         0.91,
  envMapIntensity:   3.51,
  emissiveColor:     0x9aa0a6,
  emissiveIntensity: 0.19,
});

export function createChrome() {
  const mat = new THREE.MeshStandardMaterial({
    color:             CHROME_PRESET.color,
    roughness:         CHROME_PRESET.roughness,
    metalness:         CHROME_PRESET.metalness,
    envMapIntensity:   CHROME_PRESET.envMapIntensity,
    emissive:          new THREE.Color(CHROME_PRESET.emissiveColor),
    emissiveIntensity: CHROME_PRESET.emissiveIntensity,
  });
  mat.userData.paletteId = 'chrome';
  return mat;
}

// ── Mesh helper ──────────────────────────────────────────────
/**
 * Rebuilds a mesh's UVs so V tracks world-Y across the provided
 * bounds. Required for frosted materials to render a continuous
 * vertical gradient across all faces of arbitrary geometry.
 */
export function remapUVsToWorldY(mesh, yMin, yMax) {
  const geom = mesh.geometry;
  const pos = geom.attributes.position;
  const ySpan = Math.max(1e-6, yMax - yMin);
  const uvs = new Float32Array(pos.count * 2);
  const v = new THREE.Vector3();
  mesh.updateMatrixWorld(true);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    uvs[i * 2]     = 0.5;
    uvs[i * 2 + 1] = 1.0 - (v.y - yMin) / ySpan;
  }
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
}

export const PALETTE = {
  frostedBlue:    () => createFrosted('frostedBlue'),
  frostedGreen:   () => createFrosted('frostedGreen'),
  luminanceWhite: createLuminanceWhite,
};
