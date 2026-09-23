/**
 * Public Design Profile v1. This is the interchange contract for the Lab
 * Configurator. A future private skill may import it, but the skill itself is
 * deliberately not part of this repository.
 */
export const DESIGN_PROFILE_SCHEMA_VERSION = 1 as const;

export const TARGETS = ["ship-onwards", "journal-retrofit"] as const;
export type DesignTarget = (typeof TARGETS)[number];

export const COLOR_SETS = {
  ember: {
    label: "Warm editorial",
    background: "#F5EFDF",
    surface: "#EAE3D3",
    text: "#1D2923",
    mutedText: "#536259",
    action: "#F77C57",
    actionText: "#17241F",
    link: "#8A3D2A",
  },
  garden: {
    label: "Garden paper",
    background: "#EAF2EC",
    surface: "#D9E7DB",
    text: "#15322B",
    mutedText: "#4E675C",
    action: "#A8D59B",
    actionText: "#0E3029",
    link: "#295C43",
  },
  dusk: {
    label: "Quiet dark",
    background: "#152125",
    surface: "#223136",
    text: "#F4F0E4",
    mutedText: "#B5C1B8",
    action: "#C8EB83",
    actionText: "#152125",
    link: "#C8EB83",
  },
} as const;
export type ColorSetId = keyof typeof COLOR_SETS;

export const FONT_PAIRS = {
  editorial: {
    label: "Editorial serif / Geist",
    display: "Georgia, 'Times New Roman', serif",
    body: "Geist, Arial, sans-serif",
    mono: "'Geist Mono', monospace",
  },
  studio: {
    label: "Geist / Geist",
    display: "Geist, Arial, sans-serif",
    body: "Geist, Arial, sans-serif",
    mono: "'Geist Mono', monospace",
  },
  journal: {
    label: "Geist / editorial serif",
    display: "Geist, Arial, sans-serif",
    body: "Georgia, 'Times New Roman', serif",
    mono: "'Geist Mono', monospace",
  },
} as const;
export type FontPairId = keyof typeof FONT_PAIRS;

export const RADII = {
  precise: { label: "Precise", value: "0.2rem" },
  softened: { label: "Softened", value: "0.8rem" },
  rounded: { label: "Rounded", value: "1.5rem" },
} as const;
export type RadiusId = keyof typeof RADII;

export const DENSITIES = {
  compact: { label: "Compact", factor: "0.84" },
  balanced: { label: "Balanced", factor: "1" },
  spacious: { label: "Spacious", factor: "1.2" },
} as const;
export type DensityId = keyof typeof DENSITIES;

export type DesignControls = {
  colorSet: ColorSetId;
  fontPair: FontPairId;
  radius: RadiusId;
  density: DensityId;
};

export type DesignProfile = {
  schemaVersion: typeof DESIGN_PROFILE_SCHEMA_VERSION;
  target: DesignTarget;
  controls: DesignControls;
  tokens: {
    colors: {
      background: string;
      surface: string;
      text: string;
      mutedText: string;
      action: string;
      actionText: string;
      link: string;
    };
    typography: {
      display: string;
      body: string;
      mono: string;
    };
    shape: { radius: string; spacingFactor: string };
  };
};

const DEFAULT_CONTROLS: Record<DesignTarget, DesignControls> = {
  "ship-onwards": { colorSet: "ember", fontPair: "editorial", radius: "precise", density: "spacious" },
  "journal-retrofit": { colorSet: "garden", fontPair: "studio", radius: "softened", density: "balanced" },
};

export function createDesignProfile(target: DesignTarget, controls: DesignControls = DEFAULT_CONTROLS[target]): DesignProfile {
  const colors = COLOR_SETS[controls.colorSet];
  const typography = FONT_PAIRS[controls.fontPair];
  const radius = RADII[controls.radius];
  const density = DENSITIES[controls.density];
  if (!colors || !typography || !radius || !density) throw new Error("Unsupported Design Profile control");

  return {
    schemaVersion: DESIGN_PROFILE_SCHEMA_VERSION,
    target,
    controls: { ...controls },
    tokens: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        text: colors.text,
        mutedText: colors.mutedText,
        action: colors.action,
        actionText: colors.actionText,
        link: colors.link,
      },
      typography: { display: typography.display, body: typography.body, mono: typography.mono },
      shape: { radius: radius.value, spacingFactor: density.factor },
    },
  };
}

export function defaultDesignProfile(target: DesignTarget): DesignProfile {
  return createDesignProfile(target);
}

export type ValidationResult = { ok: true; profile: DesignProfile } | { ok: false; errors: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isKey<T extends object>(value: unknown, options: T): value is keyof T {
  return typeof value === "string" && Object.hasOwn(options, value);
}

function sameJsonShape(value: unknown, canonical: unknown): boolean {
  if (Array.isArray(value) || Array.isArray(canonical)) {
    return Array.isArray(value) && Array.isArray(canonical) && value.length === canonical.length && value.every((item, index) => sameJsonShape(item, canonical[index]));
  }
  if (isRecord(value) || isRecord(canonical)) {
    if (!isRecord(value) || !isRecord(canonical)) return false;
    const keys = Object.keys(value).sort();
    const canonicalKeys = Object.keys(canonical).sort();
    return keys.length === canonicalKeys.length && keys.every((key, index) => key === canonicalKeys[index] && sameJsonShape(value[key], canonical[key]));
  }
  return value === canonical;
}

export function validateDesignProfile(input: unknown): ValidationResult {
  if (!isRecord(input)) return { ok: false, errors: ["Profile must be an object."] };
  const errors: string[] = [];
  if (input.schemaVersion !== DESIGN_PROFILE_SCHEMA_VERSION) errors.push("Unsupported schemaVersion.");
  if (!TARGETS.includes(input.target as DesignTarget)) errors.push("Unsupported target.");
  if (!isRecord(input.controls)) errors.push("Missing controls.");
  else {
    if (!isKey(input.controls.colorSet, COLOR_SETS)) errors.push("Unsupported colorSet.");
    if (!isKey(input.controls.fontPair, FONT_PAIRS)) errors.push("Unsupported fontPair.");
    if (!isKey(input.controls.radius, RADII)) errors.push("Unsupported radius.");
    if (!isKey(input.controls.density, DENSITIES)) errors.push("Unsupported density.");
  }
  if (errors.length) return { ok: false, errors };

  const controls = input.controls as DesignControls;
  const canonical = createDesignProfile(input.target as DesignTarget, controls);
  if (!sameJsonShape(input, canonical)) {
    return { ok: false, errors: ["Profile tokens must match its approved controls and contain no extra fields."] };
  }
  const readability = checkProfileReadability(canonical);
  if (!readability.passes) return { ok: false, errors: ["Profile fails the WCAG AA text contrast check."] };
  return { ok: true, profile: canonical };
}

export function parseDesignProfile(json: string): DesignProfile {
  let value: unknown;
  try { value = JSON.parse(json); }
  catch { throw new Error("Design Profile is not valid JSON."); }
  const result = validateDesignProfile(value);
  if (!result.ok) throw new Error(result.errors.join(" "));
  return result.profile;
}

export function profileFromQuery(raw: string | string[] | undefined, target: DesignTarget): DesignProfile {
  if (!raw || Array.isArray(raw)) return defaultDesignProfile(target);
  try {
    const profile = parseDesignProfile(raw);
    return profile.target === target ? profile : defaultDesignProfile(target);
  } catch {
    return defaultDesignProfile(target);
  }
}

export function profileUrl(path: string, profile: DesignProfile): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}profile=${encodeURIComponent(JSON.stringify(profile))}`;
}

function luminance(hex: string): number {
  const rgb = hex.match(/[a-f\d]{2}/gi)?.map((part) => parseInt(part, 16) / 255);
  if (!rgb || rgb.length !== 3) throw new Error(`Invalid color: ${hex}`);
  const linear = rgb.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function checkProfileReadability(profile: DesignProfile) {
  const colors = profile.tokens.colors;
  const checks = [
    { label: "Body text", ratio: contrastRatio(colors.text, colors.background) },
    { label: "Secondary text", ratio: contrastRatio(colors.mutedText, colors.background) },
    { label: "Links", ratio: contrastRatio(colors.link, colors.background) },
    { label: "Text on surfaces", ratio: contrastRatio(colors.text, colors.surface) },
    { label: "Secondary on surfaces", ratio: contrastRatio(colors.mutedText, colors.surface) },
    { label: "Links on surfaces", ratio: contrastRatio(colors.link, colors.surface) },
    { label: "Action labels", ratio: contrastRatio(colors.actionText, colors.action) },
  ];
  return { passes: checks.every((check) => check.ratio >= 4.5), checks };
}

export function profileStyle(profile: DesignProfile): Record<string, string> {
  const { colors, typography, shape } = profile.tokens;
  return {
    "--demo-background": colors.background,
    "--demo-surface": colors.surface,
    "--demo-text": colors.text,
    "--demo-muted": colors.mutedText,
    "--demo-action": colors.action,
    "--demo-action-text": colors.actionText,
    "--demo-link": colors.link,
    "--demo-display": typography.display,
    "--demo-body": typography.body,
    "--demo-mono": typography.mono,
    "--demo-radius": shape.radius,
    "--demo-density": shape.spacingFactor,
  };
}
