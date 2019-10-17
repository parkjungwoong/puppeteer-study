import {Page} from "puppeteer";

export class GetList {

    readonly page: Page;
    readonly url: string;

    constructor(private _page: Page, private _url: string) {
        this.page = _page;
        this.url = _url;
    }

    public async getList(limit?: number) {
        await this.page.goto(this.url);

        const listSelector = 'td.title > a[href^="http"]';

        return await this.page.$$eval(listSelector, a => {
            return a.map(ac => {
                return ac.getAttribute('href');
            }).slice(0,5);
        });
    }
}