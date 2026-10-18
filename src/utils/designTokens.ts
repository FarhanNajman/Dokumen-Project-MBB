/**
 * Pure functions for UI/UX Design System calculations,
 * WCAG color contrast analysis, token generation, and data filtering.
 */

export interface ColorRgb {
  r: number;
  g: number;
  b: number;
}

export interface WcagEvaluation {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  ratingLabel: string;
}

export interface DesignTokens {
  primaryColor: string;
  accentColor: string;
  borderRadius: number;
  fontSizeBase: number;
  themeMode: 'light' | 'dark';
}

/**
 * Converts a 3 or 6 digit hex string to RGB object.
 */
export function hexToRgb(hex: string): ColorRgb | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB component.
 */
function srgbLuminance(val: number): number {
  const c = val / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Calculates relative luminance of an RGB color according to WCAG 2.1 specifications.
 */
export function getRelativeLuminance(rgb: ColorRgb): number {
  const r = srgbLuminance(rgb.r);
  const g = srgbLuminance(rgb.g);
  const b = srgbLuminance(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates WCAG contrast ratio between two hex colors (1:1 to 21:1).
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1.0;

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Evaluates WCAG compliance criteria for normal and large text.
 */
export function evaluateWcagCompliance(foregroundHex: string, backgroundHex: string): WcagEvaluation {
  const ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  const aaaLarge = ratio >= 4.5;

  let ratingLabel = 'Fail';
  if (aaaNormal) {
    ratingLabel = 'AAA Exceptional';
  } else if (aaNormal) {
    ratingLabel = 'AA Passed';
  } else if (aaLarge) {
    ratingLabel = 'AA Large Only';
  }

  return {
    ratio,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
    ratingLabel,
  };
}

/**
 * Calculates inner radius according to Spatial Math constitution:
 * r_inner = Math.max(0, r_outer - padding)
 */
export function calculateNestedRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}

/**
 * Formats numeric values to Indonesian Rupiah currency string.
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats numbers into compact metric display (e.g., 1.2M, 45.2K).
 */
export function formatCompactMetric(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
  }
  return value.toString();
}

/**
 * Filter generic datasets safely with multi-field search query.
 */
export function filterRecords<T>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query.trim()) return items;
  const normalizedQuery = query.toLowerCase().trim();

  return items.filter((item) => {
    return fields.some((field) => {
      const val = item[field];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(normalizedQuery);
    });
  });
}

/**
 * Generates ready-to-copy CSS variable code block for design handoff.
 */
export function generateCssTokensExport(tokens: DesignTokens): string {
  return `:root {
  --color-primary: ${tokens.primaryColor};
  --color-accent: ${tokens.accentColor};
  --radius-outer: ${tokens.borderRadius}px;
  --radius-inner: ${calculateNestedRadius(tokens.borderRadius, 8)}px;
  --font-size-base: ${tokens.fontSizeBase}px;
  --theme-mode: "${tokens.themeMode}";
}`;
}
