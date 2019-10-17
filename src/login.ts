/**
 * 로그인 예제
 * ex) https://github.com/checkly/puppeteer-examples/blob/master/3.%20login/google_social.js
 */

import {LaunchOptions} from "puppeteer";
const puppeteer = require('puppeteer');

const opts = {} as LaunchOptions;
opts.headless = false;//false 로 하면 포그라운드로 동작
opts.args = ['--single-process'];//크롬 1.11, 1.12에서는 이 옵션이 있어야 포그라운도로 동작 가능함
opts.slowMo = 150;
const url = 'https://news.ycombinator.com/news';

async function f() {
    const browser = await puppeteer.launch(opts);
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    try {
        await page.goto(url);//페이지 이동

        //로그인 창으로 이동
        const selectorLoginPageBtn = 'span.pagetop a[href="login?goto=news"]';
        await page.waitForSelector(selectorLoginPageBtn);
        await page.click(selectorLoginPageBtn);

        //아이디 입력
        await navigationPromise;
        const selectorIdInput = 'input[name="acct"]';
        await page.waitForSelector(selectorIdInput);
        await page.type(selectorIdInput, 'myuoongtest');

        //비번 입력
        const selectorPwInput = 'input[name="pw"]';
        await page.waitForSelector(selectorPwInput, { visible: true });
        await page.type(selectorPwInput,'myuoongtest');

        //로그인 버튼 클릭
        const selectorLoginBtn = 'input[type="submit"]';
        await page.waitForSelector(selectorLoginBtn);
        await page.click(selectorLoginBtn);

        await navigationPromise;

    } catch (e) {
        throw e;
    } finally {
        await browser.close();
    }
}

try {
    f();
} catch(err) {
    console.error('err!',err);
}
