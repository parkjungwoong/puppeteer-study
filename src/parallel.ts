/**
 * 병렬 작업
 * 작업 내용 : 리스트에서 url 가져온 다음 해당 url 페이지의 title 가져오기
 */

import * as puppeteer from "puppeteer";
import {Browser, Page} from "puppeteer";

async function getList(page: Page, url: string): Promise<string[]> {
    await page.goto(url);

    const listSelector = 'td.title > a[href^="http"]';

    return await page.$$eval(listSelector, a => {
        return a.map(ac => {
            return ac.getAttribute('href');
        }).slice(0,5);
    });
}

async function getTitle(browser: Browser, url: string): Promise<string> {
    const page = await browser.newPage();
    await page.goto(url);
    return await page.title();
}

(async () => {
    const url = 'https://news.ycombinator.com/news';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let urls = await getList(page, url);

    const promises = [];

    for(let url of urls) {
        console.log(`url => [${url}]`);
        promises.push(getTitle(browser, url));
    }

    let titles = await Promise.all(promises);

    for(let title of titles) {
        console.log(`[${title}]`);
    }
    await browser.close();
})();
