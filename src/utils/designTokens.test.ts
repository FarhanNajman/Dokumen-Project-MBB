import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hexToRgb,
  calculateContrastRatio,
  evaluateWcagCompliance,
  calculateNestedRadius,
  formatIDR,
  formatCompactMetric,
  filterRecords,
  generateCssTokensExport,
} from './designTokens.ts';

test('hexToRgb parses standard 6-digit and 3-digit hex colors', () => {
  assert.deepEqual(hexToRgb('#ffffff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#000000'), { r: 0, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.equal(hexToRgb('invalid'), null);
});

test('calculateContrastRatio calculates black on white as 21:1', () => {
  const ratio = calculateContrastRatio('#000000', '#ffffff');
  assert.equal(ratio, 21);
});

test('calculateContrastRatio calculates identical colors as 1:1', () => {
  const ratio = calculateContrastRatio('#3b82f6', '#3b82f6');
  assert.equal(ratio, 1);
});

test('evaluateWcagCompliance evaluates AA and AAA thresholds correctly', () => {
  const highContrast = evaluateWcagCompliance('#000000', '#ffffff');
  assert.equal(highContrast.aaNormal, true);
  assert.equal(highContrast.aaaNormal, true);
  assert.equal(highContrast.ratingLabel, 'AAA Exceptional');

  const lowContrast = evaluateWcagCompliance('#9ca3af', '#ffffff');
  assert.equal(lowContrast.aaNormal, false);
  assert.equal(lowContrast.ratingLabel, 'Fail');
});

test('calculateNestedRadius adheres to spatial math r_inner = r_outer - padding', () => {
  assert.equal(calculateNestedRadius(16, 8), 8);
  assert.equal(calculateNestedRadius(12, 4), 8);
  assert.equal(calculateNestedRadius(4, 8), 0); // never negative
});

test('formatIDR formats currency correctly with IDR symbol', () => {
  const formatted = formatIDR(150000);
  assert.ok(formatted.includes('150.000') || formatted.includes('150,000'));
  assert.ok(formatted.includes('Rp'));
});

test('formatCompactMetric compresses numbers into scannable strings', () => {
  assert.equal(formatCompactMetric(1250000), '1.3M');
  assert.equal(formatCompactMetric(45200), '45.2K');
  assert.equal(formatCompactMetric(850), '850');
});

test('filterRecords filters items by query across specified fields', () => {
  const data = [
    { id: 1, name: 'SaaS Dashboard', tag: 'Analytics' },
    { id: 2, name: 'Mobile Banking', tag: 'Fintech' },
    { id: 3, name: 'Landing Studio', tag: 'Marketing' },
  ];

  const resultName = filterRecords(data, 'bank', ['name', 'tag']);
  assert.equal(resultName.length, 1);
  assert.equal(resultName[0].id, 2);

  const resultTag = filterRecords(data, 'analytics', ['name', 'tag']);
  assert.equal(resultTag.length, 1);
  assert.equal(resultTag[0].id, 1);

  const emptyQuery = filterRecords(data, '', ['name', 'tag']);
  assert.equal(emptyQuery.length, 3);
});

test('generateCssTokensExport outputs valid CSS variables block', () => {
  const css = generateCssTokensExport({
    primaryColor: '#4f46e5',
    accentColor: '#10b981',
    borderRadius: 12,
    fontSizeBase: 16,
    themeMode: 'light',
  });
  assert.ok(css.includes('--color-primary: #4f46e5;'));
  assert.ok(css.includes('--radius-outer: 12px;'));
  assert.ok(css.includes('--radius-inner: 4px;'));
});
