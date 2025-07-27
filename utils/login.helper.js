
const login = async  (usernameValue,usernamePassword,options = { expectSuccess: true }) =>{
    const usernameInput = await $('~test-Username');
    await usernameInput.waitForDisplayed({ timeout: 20000 });
    await usernameInput.setValue(usernameValue);

    const passwordInput = await $('~test-Password');
    await passwordInput.waitForDisplayed({ timeout: 10000 });
    await passwordInput.setValue(usernamePassword);

    const loginButton = await $('~test-LOGIN');
    await loginButton.waitForDisplayed({ timeout: 10000 });
    await loginButton.click();

    // Wait for product screen title
   if (options.expectSuccess) {
       const productTitle = await $('~test-PRODUCTS');
       await productTitle.waitForDisplayed({ timeout: 10000 });
   } else {
       const errorContainer = await $('~test-Error message');
       await errorContainer.waitForDisplayed({ timeout: 10000 });
   }
}

// utils/logout.helper.js
const logout = async () => {
  const menuBtn = await $('~test-Menu');
  await menuBtn.waitForDisplayed({ timeout: 5000 });
  await menuBtn.click();

  const logoutBtn = await $('~test-LOGOUT');
  await logoutBtn.waitForDisplayed({ timeout: 5000 });
  await logoutBtn.click();
};

module.exports = { login , logout };
