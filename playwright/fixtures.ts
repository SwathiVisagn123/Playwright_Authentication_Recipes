import { test as baseTest, expect } from "@playwright/test";
export * from "@playwright/test";
import fs from "fs";

let account: { username: any; password: any };
// Define a function to return account credentials based on the ID
async function acquireAccount(id: number) {
  // Define two accounts for demonstration
  if (id === 0) {
    account = {
      username: "snithik",
      password: "Password123",
    };
  } else if (id === 1) {
    account = {
      username: "swathika",
      password: "Password123",
    };
  }
  return account;
}

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = `playwright/.auth${id}.json`;

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.

      account = await acquireAccount(id);

      // Perform authentication steps. Replace these actions with your own.
      await page.goto("https://bookcart.azurewebsites.net/");
      await page.getByRole("button", { name: " Login " }).click();
      await page.getByLabel("Username").fill(account.username);
      await page.getByLabel("Password").fill(account.password);
      await page
        .locator("mat-card-actions")
        .getByRole("button", { name: "Login" })
        .click();
      // Wait until the page receives the cookies.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL("https://bookcart.azurewebsites.net/");
      // End of authentication steps.

      await page.context().storageState({ path: `playwright/.auth${id}.json` });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
