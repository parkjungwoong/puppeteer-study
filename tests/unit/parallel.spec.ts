import * as puppeteer from "puppeteer";
import {GetList} from "../../src/parallel/GetList";
import {NewsTitleService} from "../../src/parallel/NewsTitleService";

let browser;
let page;
let url;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    url = 'https://news.ycombinator.com/news';
});

describe('병렬처리 테스트', () => {
    test('리스트 조회 테스트', async () => {
        let getList = new GetList(page, url);

        let list = await getList.getList(5);
        console.log(`[${list}]`);
        expect(list.length).toBe(5);

    }, 10000);

    test('title 가져오기 테스트', async () => {
        let titleService = new NewsTitleService(browser);

        let naverTitle = await titleService.getTitle('https://www.naver.com/');
        let googleTitle = await titleService.getTitle('https://www.google.com/');

        expect(naverTitle).toBe('NAVER');
        expect(googleTitle).toBe('Google');
    }, 10000);

    test('title 병렬 가져오기 테스트', async () => {
        let titleService = new NewsTitleService(browser);

        const urls = [
            'https://www.naver.com/',
            'https://www.google.com/',
            'https://github.com/'
        ];
        const promises = [];

        for(let url of urls) {
            console.log(`url => [${url}]`);
            promises.push(titleService.getTitle(url));
        }

        let titles = await Promise.all(promises);

        for(let title of titles) {
            console.log(`[${title}]`);
        }
        expect(titles[0]).toBe('NAVER');
        expect(titles[1]).toBe('Google');
        expect(titles[2]).toBe('The world’s leading software development platform · GitHub');
    }, 10000);

    afterAll(async () => {
        await browser.close()
    });
})