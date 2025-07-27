const { login } = require('../utils/login.helper.js')

describe('Product Flow', () => {

 before(async () => {
 await login('standard_user', 'secret_sauce');
 });

it('should load the product list after login', async () => {

  const firstProduct = await $('(//android.widget.TextView[@content-desc="test-Item title"])[1]');
  await expect(firstProduct).toBeDisplayed();
});

it('should navigate to product detail on selecting a product', async () => {
  const firstProduct = await $('(//android.widget.TextView[@content-desc="test-Item title"])[1]');
  await firstProduct.click();

  const productTitle = await $('android=new UiSelector().textContains("Sauce Labs Backpack")');
  await productTitle.waitForDisplayed({ timeout: 1000 });
  const productPrice = await $('~test-Price');
  await productPrice.waitForDisplayed({ timeout: 1000 });

  await expect(productTitle).toBeDisplayed();
  await expect(productPrice).toBeDisplayed();

  // Go back to product list
  const backButton = await $('~test-BACK TO PRODUCTS');
  await backButton.click();
});

it('should open and apply a sort filter', async () => {
  const sortButton = await $('//android.view.ViewGroup[@content-desc="test-Modal Selector Button"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView');
  await expect(sortButton).toBeDisplayed();
  await sortButton.click();

  const sortOption = await $('android=new UiSelector().text("Price (low to high)")');
  await sortOption.click();

  // Validate sorting by checking prices of first two products
  const firstPrice = await $('(//android.widget.TextView[@content-desc="test-Price"])[1]');
  const secondPrice = await $('(//android.widget.TextView[@content-desc="test-Price"])[2]');

  const firstText = await firstPrice.getText();
  const secondText = await secondPrice.getText();
  const firstVal = parseFloat(firstText.replace('$', ''));
  const secondVal = parseFloat(secondText.replace('$', ''));
  expect(firstVal).toBeLessThanOrEqual(secondVal);
});

});
