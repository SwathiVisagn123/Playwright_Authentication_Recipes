import { test, expect } from "../playwright/fixtures";

test("first test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  await page.waitForURL("https://bookcart.azurewebsites.net/");
});
