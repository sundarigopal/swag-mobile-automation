const fs = require('fs');
const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
          './specs/login.e2e.js',
          './specs/product-catalog.e2e.js',
          './specs/cart-checkout.e2e.js',
          './specs/logout.e2e.js',
          './specs/negativeflows.e2e.js',
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
            "platformName": "Android",
            "appium:platformVersion": "13",
            "appium:deviceName": ".*",
            "appium:automationName": "UiAutomator2",
            "appium:app": path.resolve('./apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
            "appium:autoGrantPermissions": true,
            "appium:appPackage": "com.swaglabsmobileapp",
            "appium:appActivity": "com.swaglabsmobileapp.SplashActivity",
            "appium:appWaitActivity": "*",
            "appium:noReset": false,
            "appium:fullReset": true,

    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
     ['appium', {
       command: 'appium'
     }]
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        'junit',
        ['allure', { outputDir: 'allure-results' }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Define folder path
            const reportsDir = path.join(__dirname, 'reports', 'screenshots');

            // Create folder if it doesn't exist
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir, { recursive: true });
            }

            // Create a file name based on spec + test title
            const filename = `${test.parent} -- ${test.title}.png`.replace(/[\/\\?%*:|"<>]/g, '-');
            const filepath = path.join(reportsDir, filename);

            // Take and save screenshot
            await browser.saveScreenshot(filepath);
        }
    },
}
