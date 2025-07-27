const { login } = require('../utils/login.helper.js')

describe('Cart → Checkout → Order Completion Flow', () => {
   before(async () => {
   await login('standard_user', 'secret_sauce');
   });

  it('should add item to cart and proceed to checkout', async () => {
    const itemAddToCart = await $('~test-ADD TO CART');
    await itemAddToCart.click();
    await driver.pause(3000);

    const cart = await $('~test-Cart');
    await cart.waitForDisplayed({ timeout: 5000 });
    await cart.click();

    const cartContent = await $('~test-Cart Content');
    await cartContent.waitForDisplayed({ timeout: 2000 });

    // Wait for item container
     const cartItem = await $('~test-Item');
     await cartItem.waitForDisplayed({ timeout: 2000 });

      // 2. Verify Product Name
      const productName = await $('//android.view.ViewGroup[@content-desc="test-Description"]/android.widget.TextView[1]');
      const nameText = await productName.getText();
      expect(nameText).toBe('Sauce Labs Backpack');

      // 4. Verify Price
      const price = await $('//android.view.ViewGroup[@content-desc="test-Price"]/android.widget.TextView');
      const priceText = await price.getText();
      expect(priceText).toBe('$29.99');

    // 3. Tap on Checkout
        const checkoutBtn = await $('~test-CHECKOUT');
        await checkoutBtn.waitForDisplayed({ timeout: 5000 });
        await checkoutBtn.click();

        // 4. Enter dummy user details
        const firstName = await $('~test-First Name');
        const lastName = await $('~test-Last Name');
        const zipCode = await $('~test-Zip/Postal Code');

        await firstName.setValue('Test');
        await lastName.setValue('User');
        await zipCode.setValue('12345');

        // 5. Tap Continue
        const continueBtn = await $('~test-CONTINUE');
        await continueBtn.click();
        // 6. Place Order
        const finishBtn = await $('~test-FINISH');
        await finishBtn.click();

       // 7. Validate success screen
        const successHeader = await $('~test-CHECKOUT: COMPLETE!');
        await expect(successHeader).toBeDisplayed();

       // 8. Go back home
        const backHomeBtn = await $('~test-BACK HOME');
        await backHomeBtn.click();

      // 9. Reopen cart
        await cart.click();

      // 10. Validate cart is empty
       cartItemElements = await $$('//android.widget.ScrollView[@content-desc="test-Cart Content"]/android.view.ViewGroup/android.view.ViewGroup');
       const actualCartItems = [];
       for (const item of cartItemElements) {
         const desc = await item.getAttribute('content-desc');
         const text = await item.getText();
         if (desc !== 'test-CHECKOUT' && desc !== 'test-CONTINUE SHOPPING' && text.trim() !== '') {
           actualCartItems.push(item);
         }
       }
       await expect(actualCartItems.length).toBe(0);
  });
});
