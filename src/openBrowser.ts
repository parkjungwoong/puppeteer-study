import * as puppeteer from 'puppeteer';

const opts = {} as puppeteer.LaunchOptions;

opts.headless = false;//false 로 하면 포그라운드로 동작
opts.args = ['--single-process'];//크롬 1.11, 1.12에서는 이 옵션이 있어야 포그라운도로 동작 가능함
opts.slowMo = 250;

async function f() {
    const browser = await puppeteer.launch(opts);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.setViewport({width:960,height:768});
    await page.goto('https://purecss.io/', {timeout: 40000, waitUntil: 'domcontentloaded'});
    await page.screenshot({ fullPage: true, path: 'screenshot.png' });
    await browser.close();
}

try {
    f();
} catch(err) {
    console.error('err!',err);
}
