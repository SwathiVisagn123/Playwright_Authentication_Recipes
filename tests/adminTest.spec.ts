import { test } from "@playwright/test";

test.use({ storageState: "./playwright/.auth/admin.json" });

test("admin test", async ({ page }) => {
  await page.goto("https://bookcart.azurewebsites.net/myorders");
  await page.waitForURL("https://bookcart.azurewebsites.net/myorders");
  //validate if the storage state has worked and login is successful
  //my orders page 
  await page.getByPlaceholder(" Start shopping ").isVisible();
  //validate tests for admin 
  //......
});
