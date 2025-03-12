import { test } from "@playwright/test";

test("admin and user", async ({ browser }) => {
  // adminContext and all pages inside, including adminPage, are signed in as "admin".
  const adminContext = await browser.newContext({
    storageState: "./playwright/.auth/admin.json",
  });
  const adminPage = await adminContext.newPage();

  // readerContext and all pages inside, including readerPage, are signed in as "reader".
  const readerContext = await browser.newContext({
    storageState: "./playwright/.auth/reader.json",
  });
  const readerPage = await readerContext.newPage();

  // ... interact with both adminPage and userPage ...
  await adminPage.goto("https://bookcart.azurewebsites.net/myorders");
  await adminPage.waitForURL("https://bookcart.azurewebsites.net/myorders");

  await readerPage.goto("https://bookcart.azurewebsites.net/myorders");
  await readerPage.waitForURL("https://bookcart.azurewebsites.net/myorders");
  await readerPage.screenshot({
    path: "./playwright/.auth/screenshot.png",
    fullPage: true,
  });

  await adminContext.close();
  await readerContext.close();
});
