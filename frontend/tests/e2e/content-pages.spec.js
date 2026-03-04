// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Content pages — verify technology, case study, and knowledge pages render correctly.
 */

const TECH_PAGES = ['microled', 'cob-led', 'mip-led', 'fine-pitch-led', 'all-in-one-dvled', 'transparent-led', '3d-anamorphic-led', 'creative-led', 'media-facade'];

const CASE_STUDIES = ['jumeirah-al-naseem-lobby', 'dubai-mall-flagship-retail', 'adnoc-hq-command-center', 'riyadh-metro-passenger-info', 'expo-city-dubai-event-hall', 'cleveland-clinic-abu-dhabi', 'the-view-at-the-palm-transparent', 'kapsarc-3d-anamorphic'];

test.describe('Technology Pages', () => {
  test('Technology index shows 9 tech cards', async ({ page }) => {
    await page.goto('/technology');
    await page.waitForLoadState('networkidle');

    for (const tech of TECH_PAGES) {
      await expect(page.locator(`[data-testid="tech-card-${tech}"]`)).toBeVisible();
    }
  });

  for (const tech of TECH_PAGES) {
    test(`Technology detail: ${tech} loads`, async ({ page }) => {
      const response = await page.goto(`/technology/${tech}`, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBeLessThan(400);
    });
  }
});

test.describe('Case Studies', () => {
  test('Case studies index shows filter buttons', async ({ page }) => {
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="case-study-filters"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-all"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-hospitality"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-retail"]')).toBeVisible();
  });

  test('Category filter works', async ({ page }) => {
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    // Click Hospitality filter
    await page.locator('[data-testid="filter-hospitality"]').click();
    await page.waitForTimeout(500);

    // Should show only hospitality projects
    const cards = page.locator('[data-testid^="case-study-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(8); // Not all 8
  });

  for (const cs of CASE_STUDIES) {
    test(`Case study detail: ${cs} loads`, async ({ page }) => {
      const response = await page.goto(`/case-studies/${cs}`, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBeLessThan(400);

      await expect(page.locator(`[data-testid="case-study-${cs}"]`)).toBeVisible({ timeout: 10000 });
    });
  }

  test('Case study detail has spec table', async ({ page }) => {
    await page.goto('/case-studies/jumeirah-al-naseem-lobby');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="case-spec-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="case-result-0"]')).toBeVisible();
  });
});

test.describe('SLA Guide', () => {
  test('renders all sections', async ({ page }) => {
    await page.goto('/sla-guide');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="sla-guide-page"]')).toBeVisible();

    // 8 gap cards
    for (let i = 0; i < 8; i++) {
      await expect(page.locator(`[data-testid="sla-gap-${i}"]`)).toBeVisible();
    }

    // 7 checklist sections
    for (let i = 0; i < 7; i++) {
      await expect(page.locator(`[data-testid="sla-checklist-${i}"]`)).toBeVisible();
    }
  });
});

test.describe('Digital Experience Architecture', () => {
  test('renders all 6 application sections', async ({ page }) => {
    await page.goto('/digital-experience-architecture');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="dea-page"]')).toBeVisible();

    for (const app of ['media-facades', 'immersive-rooms', 'retail-experiential', 'corporate-experience', 'digital-wayfinding', '3d-anamorphic']) {
      await expect(page.locator(`[data-testid="dea-app-${app}"]`)).toBeVisible();
    }
  });
});

test.describe('CPD Programme', () => {
  test('renders all 6 session cards', async ({ page }) => {
    await page.goto('/cpd-programme');
    await page.waitForLoadState('networkidle');

    for (const id of ['microled-vs-cob', 'pixel-pitch-masterclass', 'led-for-healthcare', 'led-for-hospitality', 'transparent-creative-led', 'dvled-vs-lcd']) {
      await expect(page.locator(`[data-testid="cpd-session-${id}"]`)).toBeVisible();
    }
  });
});
