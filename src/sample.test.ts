import dotenv from 'dotenv';
import puppeteer, { Browser, Page } from 'puppeteer';

dotenv.config();

const debuggingMode = {
  headless: false,
  slowMo: 20,
};

let browser: Browser | null = null;
let page: Page;

beforeEach(async () => {
  const url = `${process.env.TARGET_URL}`;
  if (!url) {
    throw Error('TARGET_URL must be not empty.');
  }
  browser = await puppeteer.launch(debuggingMode);
  page = await browser.newPage();
  await page.goto(url);
});

afterEach(async () => {
  if (!!browser) {
    await browser.close();
  }
});

it('Example Domainのh1を参照できること', async () => {
  await page.waitFor(3000);
  expect(await page.evaluate(() => document.querySelector('h1')!.textContent)).toBe('Example Domain');
});