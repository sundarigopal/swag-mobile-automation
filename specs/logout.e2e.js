const { login , logout } = require('../utils/login.helper.js')

describe('Cart → Checkout → Order Completion Flow', () => {
   before(async () => {
     await login('standard_user', 'secret_sauce');
   });

   it('Logout Flow', async () => {
     await logout(); // logout after test finishes

     // Verify app navigated back to login
     const loginBtn = await $('~test-LOGIN');
     await loginBtn.waitForDisplayed({ timeout: 5000 });
   })
});