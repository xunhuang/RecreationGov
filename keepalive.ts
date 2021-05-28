import { Page, Puppeteer } from "puppeteer";

const puppeteer = require('puppeteer');
const moment = require("moment");

const USERNAME = process.env.RECREATION_GOV_USERNAME;
const PASSWORD = process.env.RECREATION_GOV_PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.log("set your recreation.gov user name and password with environment variable ");
    console.log("export RECREATION_GOV_USERNAME=blah");
    console.log("export RECREATION_GOV_PASSWORD=blah");
    process.exit(-1);
}

const entryURL = {
    zion: "https://www.recreation.gov/ticket/300016/ticket/3010",
    dino: "https://www.recreation.gov/ticket/300020/ticket/3050",
}

var page: any;

async function login(username?: string, password?: string) {
    await page.click("#ga-global-nav-log-in-link");
    await page.focus("#rec-acct-sign-in-email-address");
    await page.keyboard.type(username);
    await page.focus("#rec-acct-sign-in-password");
    await page.keyboard.type(password);
    await page.click(".rec-acct-sign-in-btn")
}

async function startupAndLogin(url: string) {
    const browser = await puppeteer.launch({
        // headless: false,
        headless: true,
        // args: ['--headless'],
    })
    page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 1,
    });
    page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
    );
    await page.goto(url);
    await login(USERNAME, PASSWORD);
    await page.waitForTimeout(1000);
}

async function typeDate(date: string) {
    await page.waitForSelector('#tourCalendarWithKey');
    // set date
    await page.focus('#tourCalendarWithKey');
    for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Backspace');
    }
    await page.keyboard.type(date);

    await page.waitForTimeout(500);
}

// false: reload again
// true: advance to next state
async function selectDateToMakeSureItsOK(url: string, date: string) {
    console.log("should go to URL " + url);
    await page.goto(url);
    await page.waitForSelector('#tourCalendarWithKey');
    console.log("type date.... " + date);
    await typeDate(date);
    let items = await page.$$('label[data-component="RadioPill"]');
    if (items.length > 0) {
        console.log(`Found ${items.length} entries`);
        return true;
    }
    let alerts = await page.$$('div[data-component="Alert"]');
    if (alerts.length > 0) {
        return true;
    }
    console.log("Date seems to be unavailable (it's not Available or NR), should reload page again");
    return false;
}

async function getAvailableNodes() {
    let items = await page.$$('label[data-component="RadioPill"] > input:not([disabled])');
    let nodes = [];
    for (let i of items) {
        let p = await i.getProperty("parentNode");
        nodes.push(p);
    }
    return nodes;
}

async function keepItemInCart() {
    let date = moment().add(5, "days").format("MM/DD/YYYY");
    console.log(date);

    var success = false;
    while (!success) {
        success = await selectDateToMakeSureItsOK(entryURL.dino, date);
    }

    console.log("proceed...")

    let nodes = await getAvailableNodes();
    console.log(nodes.length);
    if (nodes.length > 0) {
        await nodes[0].click();
        await page.click('.sarsa-button-primary');
        try {
            await page.waitForSelector('#show-summary-button', { timeout: 2000 });
            console.log("Time extended!....");
            // delete the item and confirm.
            await page.click('section .sarsa-inline button');
            await page.waitForTimeout(2000);
            console.log("Delete clicked!");
            await page.click('.ReactModalPortal .sarsa-button-primary');
        } catch (e) {
            if (e instanceof puppeteer.errors.TimeoutError) {
                console.log("clicked the add to cart too late, close the modal dialog and try again");
                await page.click('.ReactModalPortal button');
                throw e;
            }
        }
    }
}

const iterations = 3;

(async () => {
    await startupAndLogin(entryURL.dino);
    for (let i = 0; i < iterations; i++) {
        try {
            await keepItemInCart();
            await page.waitForTimeout(3 * 60 * 1000); // 3 minutes between runs
        } catch (e) {
            await page.waitForTimeout(10000);
        }
    }
})();
