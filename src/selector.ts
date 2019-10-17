/**
 * CSS 선택자를 이용한 값 조회
 */

import {LaunchOptions} from "puppeteer";
const puppeteer = require('puppeteer');

const opts = {} as LaunchOptions;
const url = 'https://news.ycombinator.com/news';

async function f() {
    const browser = await puppeteer.launch(opts);
    const page = await browser.newPage();

    try {
        await page.goto(url);//페이지 이동

        /**
         * 선택자 사용 방법1 (타깃이 하나일 때)
         */
        const selector = 'b.hnname > a';

        //waitFor, evaluate 조합
        let titleText = await page.waitFor(selector);
        let selectType1 = await page.evaluate(selector => selector.innerText, titleText);
        console.log(`selectType1 => [${selectType1}]`);

        //$$eval
        const selectType2 = await page.$$eval(selector, targets => {
            return targets.map(target =>{
                return `${target.innerText}`;
            })
        });
        console.log(`selectType2 => [${selectType2}]`);

        /**
         * 선택자 사용 방법2 (리스트에서 특정 값 가져올 때)
         */
        const selector2 = 'td.title > a';
        const selectType3 = await page.$$eval(selector2, targets => {
            return targets.map(target => {
                return `[${target.textContent}],[${target.getAttribute('href').slice(0,10)}]`;
            });
        });
        console.log(`selectType3 => [${selectType3}]`);

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
