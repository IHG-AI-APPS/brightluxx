// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Smoke tests — verify all major pages load without errors.
 */
const PAGES = [
  { path: '/', testId: 'home-page', name: 'Home' },
  { path: '/products', name: 'Products' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/technology', name: 'Technology Index' },
  { path: '/knowledge', name: 'Knowledge Index' },
  { path: '/resources', name: 'Resource Library' },
  { path: '/case-studies', testId: 'case-studies-index', name: 'Case Studies' },
  { path: '/contact', name: 'Contact' },
  { path: '/for-architects', name: 'For Architects' },
  { path: '/calculator', name: 'Screen Calculator' },
  { path: '/budget-estimator', name: 'Budget Estimator' },
  { path: '/compare', name: 'Compare Products' },
  { path: '/cpd-programme', testId: 'cpd-programme-page', name: 'CPD Programme' },
  { path: '/design-assist', testId: 'design-assist-page', name: 'Design Assist' },
  { path: '/digital-experience-architecture', testId: 'dea-page', name: 'Digital Experience Architecture' },
  { path: '/sla-guide', testId: 'sla-guide-page', name: 'SLA Guide' },
  { path: '/technology-selector', testId: 'technology-selector-page', name: 'Technology Selector' },
  { path: '/value-engineering', name: 'Value Engineering' },
  { path: '/spec-substitution', name: 'Spec Substitution' },
  { path: '/lp/specifier-toolkit', testId: 'specifier-toolkit-lp', name: 'LinkedIn LP' },
];

test.describe('Smoke Tests — All Pages Load', () => {
  for (const page of PAGES) {
    test(`${page.name} (${page.path}) loads without error`, async ({ page: p }) => {
      const response = await p.goto(page.path, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBeLessThan(400);

      // Check no React error overlay
      const errorOverlay = await p.locator('#webpack-dev-server-client-overlay').count();
      expect(errorOverlay).toBe(0);

      // If testId provided, verify the main container
      if (page.testId) {
        await expect(p.locator(`[data-testid="${page.testId}"]`)).toBeVisible({ timeout: 10000 });
      }
    });
  }
});

test.describe('Navigation', () => {
  test('Navbar has all expected links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    for (const name of ['products', 'solutions', 'technologies', 'resources', 'case-studies']) {
      await expect(page.locator(`[data-testid="nav-${name}"]`)).toBeVisible();
    }
  });

  test('Tools mega-menu opens and shows tools', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Hover/click Tools
    await page.locator('text=Tools').first().click();
    await page.waitForTimeout(500);

    // Check for specifier tools
    await expect(page.locator('text=Screen Calculator').first()).toBeVisible();
    await expect(page.locator('text=Budget Estimator').first()).toBeVisible();
    await expect(page.locator('text=Technology Selector').first()).toBeVisible();
  });
});
