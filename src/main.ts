import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({headless: false,slowMo: 250});
    const page = await browser.newPage();
    await page.goto('http://www.google.com');

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);

    await browser.close();
})();