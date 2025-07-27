# swag-mobile-automation
# Swag Android App Automation with WebdriverIO + Appium

This project automates end-to-end user flows on the **Sauce Labs Swag Android App** using WebdriverIO, Appium, and JavaScript. It simulates a real-world user journey, including login, product selection, cart checkout, and logout.

---

##  Prerequisites

Make sure you have the following installed:

### System Dependencies

- **Node.js**: v18 or higher  
  [Download Node.js](https://nodejs.org/en/download)

- **Java**: Java 17  
  On macOS with Homebrew:
  ```bash
  brew install openjdk@17
  ```

- **Android Studio** (including Android SDK + Emulator)

- **Appium**: Installed globally
  ```bash
  npm install -g appium
  ```

- **WebdriverIO CLI**
  ```bash
  npm install --save-dev @wdio/cli
  ```

- **Appium Inspector** (for inspecting mobile elements)
  [Use Appium Inspector](https://inspector.appiumpro.com/)

---

##  Environment Setup (`~/.zshrc`)

Make sure the following is added to your `~/.zshrc` file:

```zsh
# Android SDK paths
export ANDROID_HOME=/Library/Android/sdk
export ANDROID_SDK_ROOT=/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Java 17 setup
export JAVA_HOME="/opt/homebrew/opt/openjdk@17"
export PATH="$JAVA_HOME/bin:$PATH"
```

> After editing the file, apply the changes using:
```bash
source ~/.zshrc
```

---

##  Emulator or Device Setup

To verify that your emulator/device is connected:

```bash
adb devices
```

You should see something like:

```
List of devices attached
emulator-5554	device
```

---

##  Install Project Dependencies

Run this in the project root directory:

```bash
npm install
```

This will install:

- `@wdio/cli`
- `@wdio/appium-service`
- `@wdio/mocha-framework`
- `appium`
- `chai`, `expect-webdriverio`, etc.

---

## 🔧 How to Run Tests

### Start Appium server:

```bash
appium
```

> Make sure your emulator or physical device is running.

### Run the test:
You can run the test in one of the following ways:

### Option 1: Using `npx`
```bash
npx wdio run wdio.conf.js
```

### Option 2: Using npm script (preferred)
```bash
npm run test
```

This command uses the script defined in `package.json`:

```json
{
  "scripts": {
    "test": "wdio run wdio.conf.js"
  }
}
```

This will:

- Launch the emulator (if not already running)
- Launch the Swag app
- Run the complete test flow

---

##  Project Structure

```
.
├── .github/workflows/         # GitHub Actions for CI
├── specs/                     # Test specs file
│   └── swagAppTest.spec.js
├── pageobjects/               # Page Object Models
│   ├── login.page.js
│   └── products.page.js
├── utils/                     # Utility methods (login, logout)
│   └── login.helper.js
├── wdio.conf.js               # WebDriverIO Configuration File
├── package.json               # NPM dependencies and scripts
└── README.md                  # readme file

```

---

##  Tools and Frameworks Used

- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
- [Mocha](https://mochajs.org/)
- JavaScript
- GitHub Actions for CI setup

---

##  Notes

- Tested only on **Android platform**
- Used emulator via Android Studio
- Appium Inspector used to find UI selectors
- Element locators used: `accessibilityId`, `resource-id`, `xpath`

---

##  Features Automated

1. Login:
    ○ Automate both valid and invalid login attempts
    ○ Validate error messages on failure
    ○ Confirm successful login redirects to product catalog
2. Product Catalog:
   ○ Validate product list is loaded
   ○ Select a specific product, view details
   ○ Filter/sort products
3. Cart & Checkout:
   ○ Add products to cart
   ○ Validate product count and cart screen
   ○ Proceed to checkout, enter dummy user info
   ○ Place order and verify success screen
   ○ Validate cart is cleared after order
4. Logout:
   ○ Automate logout flow
   ○ Ensure app returns to login screen
5. Negative Flows:
   ○ Try placing order with empty cart
   ○ Leave checkout form fields empty and validate error messages

---

##  Test Reports(Screenshots on Failure)

Tests will show pass/fail status in the terminal. To generate more visual test reports (like HTML or Allure), you can later integrate:
On test failure, screenshots are saved to:

```bash
./reports/screenshots/

```
---

##  GitHub Actions CI

GitHub Actions workflow defined under:

bash
```bash
 .github/workflows/node.js.yml
```

---

## Limitations


1. Only Android is covered.
2. Emulator should be pre-booted manually before CI or local runs.
3. App must be installed or available locally (or provide APK path in capabilities).

---
