import { test, expect } from "@playwright/test";

test("first test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/");
  const element = page.getByText(/swathika/);
  await expect(element).toBeVisible();
  await expect(page).toHaveURL("https://bookcart.azurewebsites.net/");
});
