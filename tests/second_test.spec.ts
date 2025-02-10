import { test, expect } from "../playwright/fixtures";

test("second test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/myorders");
  await page.pause();
  await page.waitForURL("https://bookcart.azurewebsites.net/myorders");
});
