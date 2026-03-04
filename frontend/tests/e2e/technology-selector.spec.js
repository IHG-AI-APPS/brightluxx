// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Technology Selector Quiz — full E2E flow.
 */

test.describe('Technology Selector Quiz', () => {
  test('completes full quiz flow: Hospitality → MicroLED', async ({ page }) => {
    await page.goto('/technology-selector');
    await page.waitForLoadState('networkidle');

    // Step 1: Application
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('type of project');
    await page.locator('[data-testid="quiz-option-hospitality"]').click();

    // Step 2: Viewing
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('viewing distance');
    await page.locator('[data-testid="quiz-option-close"]').click();

    // Step 3: Environment
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('environment');
    await page.locator('[data-testid="quiz-option-indoor-controlled"]').click();

    // Step 4: Priority
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('priority');
    await page.locator('[data-testid="quiz-option-image-quality"]').click();

    // Step 5: Budget
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('budget');
    await page.locator('[data-testid="quiz-option-premium"]').click();

    // Result
    await expect(page.locator('[data-testid="quiz-result-container"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="quiz-primary-result"]')).toContainText('MicroLED');

    // Lead gate visible
    await expect(page.locator('[data-testid="quiz-lead-gate"]')).toBeVisible();
  });

  test('unlocks full result after form submission', async ({ page }) => {
    await page.goto('/technology-selector');
    await page.waitForLoadState('networkidle');

    // Quick flow through quiz
    await page.locator('[data-testid="quiz-option-retail"]').click();
    await page.locator('[data-testid="quiz-option-mid"]').click();
    await page.locator('[data-testid="quiz-option-indoor-bright"]').click();
    await page.locator('[data-testid="quiz-option-budget"]').click();
    await page.locator('[data-testid="quiz-option-mid"]').click();

    // Fill lead form
    await page.locator('[data-testid="quiz-field-name"]').fill('E2E Quiz Tester');
    await page.locator('[data-testid="quiz-field-email"]').fill('quiz@playwright.com');
    await page.locator('[data-testid="quiz-field-company"]').fill('E2E Testing Co');
    await page.locator('[data-testid="quiz-field-role"]').selectOption('AV Consultant');

    await page.locator('[data-testid="quiz-unlock-button"]').click();

    // Unlocked result
    await expect(page.locator('[data-testid="quiz-unlocked-result"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="quiz-tech-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="quiz-da-link"]')).toBeVisible();
  });

  test('back button works during quiz', async ({ page }) => {
    await page.goto('/technology-selector');
    await page.waitForLoadState('networkidle');

    // Go to step 2
    await page.locator('[data-testid="quiz-option-corporate"]').click();
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('viewing distance');

    // Go back
    await page.locator('[data-testid="quiz-back-button"]').click();
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('type of project');
  });

  test('restart button resets quiz', async ({ page }) => {
    await page.goto('/technology-selector');
    await page.waitForLoadState('networkidle');

    // Complete quiz quickly
    await page.locator('[data-testid="quiz-option-outdoor"]').click();
    await page.locator('[data-testid="quiz-option-very-far"]').click();
    await page.locator('[data-testid="quiz-option-outdoor"]').click();
    await page.locator('[data-testid="quiz-option-wow"]').click();
    await page.locator('[data-testid="quiz-option-mid"]').click();

    // Restart
    await page.locator('[data-testid="quiz-restart-button"]').click();

    // Should be back at step 1
    await expect(page.locator('[data-testid="quiz-question"]')).toContainText('type of project');
  });
});
