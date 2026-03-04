// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Lead capture flow tests — verify all forms work end-to-end.
 */

test.describe('Contact Form', () => {
  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="input-name"]').fill('E2E Test Architect');
    await page.locator('[data-testid="input-company"]').fill('Playwright Architects');
    await page.locator('[data-testid="input-email"]').fill('test@playwright.com');
    await page.locator('[data-testid="input-phone"]').fill('+971551234567');
    await page.locator('[data-testid="input-city"]').fill('Dubai');
    await page.locator('[data-testid="input-application"]').selectOption({ index: 1 });

    await page.locator('[data-testid="lead-capture-submit-button"]').click();

    await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Design Assist Form', () => {
  test('shows validation error when required fields empty', async ({ page }) => {
    await page.goto('/design-assist');
    await page.waitForLoadState('networkidle');

    // Scroll to form
    await page.locator('[data-testid="da-booking-form"]').scrollIntoViewIfNeeded();

    // Submit empty form
    await page.locator('[data-testid="da-submit-button"]').click();

    // Should show error
    await expect(page.locator('[data-testid="da-form-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="da-form-error"]')).toContainText('required');
  });

  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/design-assist');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="da-booking-form"]').scrollIntoViewIfNeeded();

    await page.locator('[data-testid="da-field-name"]').fill('E2E Test Architect');
    await page.locator('[data-testid="da-field-email"]').fill('e2e@playwright.com');
    await page.locator('[data-testid="da-field-company"]').fill('E2E Firm');
    await page.locator('[data-testid="da-field-role"]').selectOption('Architect');
    await page.locator('[data-testid="da-field-project-type"]').selectOption('Hospitality');
    await page.locator('[data-testid="da-field-project-stage"]').selectOption('Concept');
    await page.locator('[data-testid="da-field-message"]').fill('E2E test project');

    await page.locator('[data-testid="da-submit-button"]').click();

    await expect(page.locator('[data-testid="da-form-success"]')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('CPD Programme Form', () => {
  test('shows validation error when required fields empty', async ({ page }) => {
    await page.goto('/cpd-programme');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="cpd-booking-form"]').scrollIntoViewIfNeeded();
    await page.locator('[data-testid="cpd-submit-button"]').click();

    await expect(page.locator('[data-testid="cpd-form-error"]')).toBeVisible();
  });

  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/cpd-programme');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="cpd-booking-form"]').scrollIntoViewIfNeeded();

    await page.locator('[data-testid="cpd-field-name"]').fill('E2E CPD Tester');
    await page.locator('[data-testid="cpd-field-email"]').fill('cpd@playwright.com');
    await page.locator('[data-testid="cpd-field-company"]').fill('E2E Consulting');
    await page.locator('[data-testid="cpd-field-role"]').selectOption('Architect');
    await page.locator('[data-testid="cpd-field-topic"]').selectOption({ index: 1 });

    await page.locator('[data-testid="cpd-submit-button"]').click();

    await expect(page.locator('[data-testid="cpd-form-success"]')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('LinkedIn Landing Page Form', () => {
  test('shows validation error when required fields empty', async ({ page }) => {
    await page.goto('/lp/specifier-toolkit');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="toolkit-submit-button"]').click();

    await expect(page.locator('[data-testid="toolkit-form-error"]')).toBeVisible();
  });

  test('submits successfully and shows resource links', async ({ page }) => {
    await page.goto('/lp/specifier-toolkit');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="toolkit-field-name"]').fill('E2E LinkedIn Tester');
    await page.locator('[data-testid="toolkit-field-email"]').fill('lp@playwright.com');
    await page.locator('[data-testid="toolkit-field-company"]').fill('E2E Corp');
    await page.locator('[data-testid="toolkit-field-role"]').selectOption('Architect');

    await page.locator('[data-testid="toolkit-submit-button"]').click();

    await expect(page.locator('[data-testid="toolkit-form-success"]')).toBeVisible({ timeout: 10000 });
  });
});
