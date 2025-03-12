import { test as setup } from "@playwright/test";

const adminFile = "./playwright/.auth/admin.json";

setup("authenticate as admin", async ({ request }) => {
  // authenticate
  await request.post("https://bookcart.azurewebsites.net/api/login", {
    form: {
      user: "BookcartAdmin",
      password: "Password1234",
    },
  });
  await request.storageState({ path: adminFile });
});

const readerFile = "./playwright/.auth/reader.json";

setup("authenticate as reader", async ({ request }) => {
  // authenticate
  await request.post("https://bookcart.azurewebsites.net/api/login", {
    form: {
      user: "BookcartReader",
      password: "Password1234",
    },
  });
  await request.storageState({ path: readerFile });
});
