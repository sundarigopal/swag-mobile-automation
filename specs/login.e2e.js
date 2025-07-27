const { expect } = require('@wdio/globals')
const { login } = require('../utils/login.helper.js')


describe('SauceLabs App - Login Test', () => {
  it('should show error on invalid login', async () => {
     await login('wrong_user', 'bad_pass',{expectSuccess: false});

     const errorContainer = await $('~test-Error message');
     await errorContainer.waitForDisplayed({ timeout: 5000 });

     // Get the child text element inside the container
     const errorTextView = await errorContainer.$('android.widget.TextView');
     const actualErrorText = await errorTextView.getText();

     // Combined check
     await expect(errorContainer).toBeDisplayed();
     await expect(actualErrorText).toBe('Username and password do not match any user in this service.');
  });

  it('should login successfully', async () => {
    await login('standard_user', 'secret_sauce');
    const listProduct = await $('~test-PRODUCTS'); // Update based on actual ID
    await expect(listProduct).toBeDisplayed();
  });
});






