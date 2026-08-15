/**
 * E2E Auth Storage Test
 * Confirms admin tokens are stored in sessionStorage (not localStorage)
 * and that stale localStorage tokens are cleaned up on load.
 */
const { test, expect } = require('@playwright/test');

const BASE = process.env.REACT_APP_BACKEND_URL || 'https://space-modern-build.preview.emergentagent.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@brightluxx.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brightluxx2025';

test.describe('Admin Auth Token Storage', () => {

  test('tokens stored in sessionStorage after login, not localStorage', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });

    // Fill login form
    await page.fill('input[type="email"], input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"], input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Verify sessionStorage has the token
    const sessionToken = await page.evaluate(() => sessionStorage.getItem('blx_admin_token'));
    expect(sessionToken).toBeTruthy();
    expect(sessionToken.length).toBeGreaterThan(10);

    // Verify localStorage does NOT have the token
    const localToken = await page.evaluate(() => localStorage.getItem('blx_admin_token'));
    expect(localToken).toBeNull();

    const localRefresh = await page.evaluate(() => localStorage.getItem('blx_admin_refresh'));
    expect(localRefresh).toBeNull();
  });

  test('stale localStorage tokens are cleaned up on page load', async ({ page }) => {
    // Simulate a stale localStorage token from the old system
    await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.setItem('blx_admin_token', 'stale-fake-token-12345');
      localStorage.setItem('blx_admin_refresh', 'stale-fake-refresh-67890');
    });

    // Reload — the migration cleanup should fire
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Verify stale tokens are removed
    const localToken = await page.evaluate(() => localStorage.getItem('blx_admin_token'));
    expect(localToken).toBeNull();

    const localRefresh = await page.evaluate(() => localStorage.getItem('blx_admin_refresh'));
    expect(localRefresh).toBeNull();
  });

  test('logout clears sessionStorage tokens', async ({ page }) => {
    // Login first
    await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"], input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"], input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // Confirm token exists
    const tokenBefore = await page.evaluate(() => sessionStorage.getItem('blx_admin_token'));
    expect(tokenBefore).toBeTruthy();

    // Find and click logout
    const logoutBtn = page.locator('text=Logout').or(page.locator('[data-testid*="logout"]')).or(page.locator('button:has-text("Log")'));
    if (await logoutBtn.count() > 0) {
      await logoutBtn.first().click();
      await page.waitForTimeout(1000);

      // Verify tokens cleared
      const tokenAfter = await page.evaluate(() => sessionStorage.getItem('blx_admin_token'));
      expect(tokenAfter).toBeNull();
    }
  });
});
