import { test, expect } from "@playwright/test";

test("first test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");

  await expect(page).toHaveURL("https://bookcart.azurewebsites.net/");
});
