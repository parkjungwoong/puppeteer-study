import {Page} from "puppeteer";
import {consts} from "./consts";

export class Ycombinator {
    private readonly url:string = consts.url;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(id:string, pw:string) {
        //메인 페이지로 이동
        await this.page.goto(this.url);

        //로그인 입력 폼 클릭
        const selectorLoginPageBtn = 'span.pagetop a[href="login?goto=news"]';
        await this.page.waitForSelector(selectorLoginPageBtn);
        await this.page.click(selectorLoginPageBtn);

        //아이디 입력
        const selectorIdInput = 'input[name="acct"]';
        await this.page.waitForSelector(selectorIdInput);
        await this.page.type(selectorIdInput, id);

        //비번 입력
        const selectorPwInput = 'input[name="pw"]';
        await this.page.waitForSelector(selectorPwInput, { visible: true });
        await this.page.type(selectorPwInput,pw);

        //로그인 버튼 클릭
        const selectorLoginBtn = 'input[type="submit"]';
        await this.page.waitForSelector(selectorLoginBtn);
        await this.page.click(selectorLoginBtn);
    }

    async getMe() {
        //유저 정보 클릭
        const selectorMeBtn = '#me';
        await this.page.waitForSelector(selectorMeBtn);
        await this.page.click(selectorMeBtn);

        //유저 아이디
        const selectorUser = 'a.hnuser font';
        const user = await this.getText(selectorUser);

        //어바웃 내용
        const selectorAbout = 'textarea[name="about"]';
        const about = await this.getText(selectorAbout);

        console.log(`user=>${user}\nabout=>${about}`);
    }

    private async getText(selector: string): Promise<string> {
        await this.page.waitForSelector(selector);

        const text = await this.page.$$eval(selector, targets => {
            return targets.map(target =>{
                return `${target.innerHTML}`;
            });
        });

        return text[0];
    }
}