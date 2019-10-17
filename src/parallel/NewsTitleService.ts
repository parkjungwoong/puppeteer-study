import {Browser} from "puppeteer";

export class NewsTitleService {

    private readonly browser: Browser;

    constructor(private _browser: Browser) {
        this.browser = _browser;
    }

    public async getTitle(url: string): Promise<string> {
        const page = await this.browser.newPage();
        await page.goto(url);
        return await page.title();
    }
}