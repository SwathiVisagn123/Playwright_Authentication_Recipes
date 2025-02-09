import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.getByRole("button", { name: " Login " }).click();
  await page.getByLabel("Username").fill("swathika");
  await page.getByLabel("Password").fill("Password123");
  await page
    .locator("mat-card-actions")
    .getByRole("button", { name: "Login" })
    .click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://bookcart.azurewebsites.net/");
  // End of authentication steps.
  await page.context().storageState({ path: "playwright/.auth.json" });
});
