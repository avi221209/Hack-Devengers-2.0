import { test, expect } from '@playwright/test';

test.describe("Dukaan Ready E2E Flow & Regression Tests", () => {
  test("Full Happy Path: Create Storefront -> Verify Details -> QR Code -> Phone Lookup", async ({ page }) => {
    // 1. Navigate to Create Wizard Page
    await page.goto('/create');
    await expect(page.locator('h1')).toContainText('Create Your Instant Dukaan Page');

    // 2. Step 1: Business Basics
    await page.fill('input[placeholder*="Sharma Tailors"]', 'Kolhapur Auto Care');
    await page.click('button:has-text("Mechanic")');
    await page.click('button:has-text("Continue")');

    // 3. Step 2: Offerings (Click a quick suggestion service to pass validation)
    await page.click('button:has-text("Two-Wheeler Servicing")');
    await page.click('button:has-text("Continue")');

    // 4. Step 3: Contact & Location
    await page.fill('input[type="tel"]', '9876543210');
    await page.fill('input[placeholder*="Ganpati Chowk"]', 'Shop 12, Station Road');
    await page.click('button:has-text("Continue")');

    // 5. Step 4: Hours
    await page.click('button:has-text("Continue")');

    // 6. Step 5: Theme
    await page.click('button:has-text("Continue")');

    // 7. Step 6: Submit Storefront Generation
    await page.click('button:has-text("Create My Storefront Now")');

    // 8. Assert Navigation to Storefront Page
    await expect(page).toHaveURL(/\/store\/kolhapur-auto-care/, { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Kolhapur Auto Care');

    // 9. Assert WhatsApp Button Link
    const whatsappBtn = page.locator('a:has-text("Chat on WhatsApp")').first();
    await expect(whatsappBtn).toBeVisible();
    const href = await whatsappBtn.getAttribute('href');
    expect(href).toContain('wa.me/919876543210');

    // 10. Verify QR Code Modal
    await page.locator('button:has-text("QR Code")').first().click();
    await expect(page.locator('text=Share & Print QR Code')).toBeVisible();
    await page.locator('button[aria-label="Close"]').click();

    // 11. Verify /my-storefronts Lookup by Phone
    await page.goto('/my-storefronts');
    await page.fill('input[type="tel"]', '9876543210');
    await page.click('button:has-text("Search")');
    await expect(page.locator('text=Kolhapur Auto Care').first()).toBeVisible();
  });

  test("Phase 1 Regression Test: Requesting nonexistent slug renders Storefront Not Found state", async ({ page }) => {
    await page.goto('/store/non-existent-bug-slug-99999');

    // Must render Storefront Not Found UI cleanly within 5 seconds instead of hanging
    await expect(page.locator('h2:has-text("Storefront Not Found")')).toBeVisible({ timeout: 6000 });
    await expect(page.locator('a:has-text("Create Storefront")')).toBeVisible();
  });
});
