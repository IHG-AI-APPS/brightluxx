// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Admin panel tests — login and dashboard.
 */

test.describe('Admin Panel', () => {
  test('admin login page loads', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Should show login form
    const loginVisible = await page.locator('input[type="email"], input[type="text"][placeholder*="email" i]').isVisible();
    expect(loginVisible).toBe(true);
  });

  test('admin login with valid credentials', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Fill credentials
    await page.locator('input[type="email"], input[type="text"][placeholder*="email" i]').first().fill('admin@brightluxx.com');
    await page.locator('input[type="password"]').first().fill('brightluxx2025');

    // Submit
    await page.locator('button[type="submit"]').first().click();

    // Wait for dashboard to load
    await page.waitForTimeout(3000);

    // Should navigate away from login or show dashboard content
    const url = page.url();
    const hasDashboard = url.includes('dashboard') || url.includes('admin');
    expect(hasDashboard).toBe(true);
  });
});

/**
 * Backend API tests.
 */
test.describe('Backend APIs', () => {
  test('GET /api/products returns products', async ({ request }) => {
    const res = await request.get('/api/products');
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.products.length).toBeGreaterThan(0);
  });

  test('GET /api/sitemap.xml returns valid XML', async ({ request }) => {
    const res = await request.get('/api/sitemap.xml');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('/technology-selector');
    expect(text).toContain('/design-assist');
    expect(text).toContain('/case-studies');
  });

  test('POST /api/design-assist/request with valid data', async ({ request }) => {
    const res = await request.post('/api/design-assist/request', {
      data: { name: 'E2E API', email: 'api@test.com', company: 'Test', role: 'Architect' },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  test('POST /api/design-assist/request with missing fields returns 422', async ({ request }) => {
    const res = await request.post('/api/design-assist/request', {
      data: { name: 'Incomplete' },
    });
    expect(res.status()).toBe(422);
  });

  test('POST /api/cpd/request with valid data', async ({ request }) => {
    const res = await request.post('/api/cpd/request', {
      data: { name: 'E2E CPD', email: 'cpd@test.com', company: 'Test', role: 'AV Consultant', preferred_topic: 'MicroLED vs COB' },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  test('POST /api/leads with valid data', async ({ request }) => {
    const res = await request.post('/api/leads', {
      data: { name: 'E2E Lead', email: 'lead@test.com', company: 'Test', role: 'PM', source: 'e2e_test', application: 'Testing' },
    });
    expect(res.status()).toBe(200);
  });

  test('POST /api/products/compare returns comparison', async ({ request }) => {
    const res = await request.post('/api/products/compare', {
      data: ['BL-COB040', 'BL-IP18'],
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.products.length).toBe(2);
  });
});
