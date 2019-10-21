/**
 * 페이지 접속 -> 로그인 페이지 이동 -> 로그인 -> 내 정보 조회
 */
import {LaunchOptions} from "puppeteer";
import {Ycombinator} from "./ycombinator";
const puppeteer = require('puppeteer');

const opts = {} as LaunchOptions;
opts.headless = false;//false 로 하면 포그라운드로 동작
opts.args = ['--single-process'];//크롬 1.11, 1.12에서는 이 옵션이 있어야 포그라운도로 동작 가능함
opts.slowMo = 100;

async function f() {
    const browser = await puppeteer.launch(opts);
    const page = await browser.newPage();
    const id = 'myuoongtest';
    const pw = 'myuoongtest';

    try {
        const ycombinator = new Ycombinator(page);
        await ycombinator.login(id,pw);
        await ycombinator.getMe();

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
