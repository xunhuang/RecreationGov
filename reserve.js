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

var page = null;

async function login(page, username, password) {
  await page.click("#ga-global-nav-log-in-link");
  await page.focus("#rec-acct-sign-in-email-address");
  await page.keyboard.type(username);
  await page.focus("#rec-acct-sign-in-password");
  await page.keyboard.type(password);
  await page.click(".rec-acct-sign-in-btn")
}

async function startupAndLogin(url) {
  const browser = await puppeteer.launch({
    headless: false,
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
  await login(page, USERNAME, PASSWORD);
  await page.waitForTimeout(1000);
}

async function typeDate(date) {
  await page.waitForSelector('#tourCalendarWithKey');
  // set date
  await page.focus('#tourCalendarWithKey');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Backspace');
  }
  await page.keyboard.type(date);

  await page.waitForTimeout(500);
}

async function typeQuanitiy(space) {
  await page.click('#guest-counter');
  await page.waitForSelector('.sarsa-text-field-input');
  await page.focus('.sarsa-text-field-input');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(space.toString());
  await page.click('.sarsa-button-link');
}

// false: reload again
// true: advance to next state
async function selectDateToMakeSureItsOK(url, date) {
  await page.goto(url);
  await page.waitForSelector('#tourCalendarWithKey');
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

// false: reload again
// true: advance to next state
async function addDateToCart(date, space, acceptableTimes) {
  // set quantity
  await typeQuanitiy(space);
  while (1) {
    let items = await page.$$('label[data-component="RadioPill"] > input:not([disabled])');
    console.log(`${items.length} entries with availabilities`);
    if (items.length > 0) {
      let nodes = [];
      for (var i of items) {
        let p = await i.getProperty("parentNode");
        nodes.push(p);
      }
      for (let node of nodes) {
        let timevalue = await page.evaluate(el => el.textContent, await node.$(".ti-radio-pill-time"));
        let slots = await page.evaluate(el => el.textContent, await node.$(".ti-radio-pill-available"));
        let numslots = parseInt(slots.replace("(", '').replace(' left)', ''));
        if (acceptableTimes.includes(timevalue)) {
          if (numslots >= space) {
            console.log(`Acceptable time slot: ${timevalue} = ${numslots} free slots`)
            await node.click();
            await page.click('.sarsa-button-primary');
            // make sure it is successfully placed in the cart
            try {
              await page.waitForSelector('#show-summary-button', { timeout: 2000 });
              console.log("yahhooooo!");
              return true;
            } catch (e) {
              if (e instanceof puppeteer.errors.TimeoutError) {
                console.log("clicked the add to cart too late, close the modal dialog and try again");
                await page.click('.ReactModalPortal button');
              }
            }
          }
        }
      }
    }

    // wait 5 seconds and try again
    await page.waitForTimeout(5000);
    while (1) {
      await typeDate(date);
      items = await page.$$('label[data-component="RadioPill"]');
      if (items.length > 0) {
        console.log(`Found ${items.length} entries`);
        break;
      }
      let alerts = await page.$$('div[data-component="Alert"]');
      if (alerts.length > 0) {
        break;
      }
      await page.waitForTimeout(500);
    }
  };
}

async function keepItemInCart() {
  let date = moment().add(5, "days").format("MM/DD/YYYY");
  console.log(date);

  let success = false;
  while (!success) {
    success = await selectDateToMakeSureItsOK(entryURL.dino, date);
  }

  let nodes = await getAvailableNodes();
  if (nodes.length > 0) {
    await nodes[0].click();
    await page.click('.sarsa-button-primary');
    try {
      await page.waitForSelector('#show-summary-button', { timeout: 2000 });
      console.log("Time extended!....");
      await page.waitForTimeout(2000);
      // delete the item and confirm.
      await page.click('section .sarsa-inline button');
      await page.waitForTimeout(2000);
      console.log("Delete clicked!");
      await page.click('.ReactModalPortal .sarsa-button-primary');
    } catch (e) {
      if (e instanceof puppeteer.errors.TimeoutError) {
        console.log("clicked the add to cart too late, close the modal dialog and try again");
        await page.click('.ReactModalPortal button');
      }
    }
  }
}

async function getParkAvailableTimeslots(url, date, space, acceptableTimes) {
  const State = {
    NEW: "STATE_NEW",
    LOGGEDIN: "STATE_LOGGEDIN",
    DATE_AVAIL_OR_NR: "STATE_AVAIL_OR_NR",
    ITEM_IN_CART: "STATE_ITEM_IN_CART",
  };
  let state = State.NEW;
  while (1) {
    console.log(`**************************************** ${state}`);
    switch (state) {
      case State.NEW:
        await startupAndLogin(url);
        state = State.LOGGEDIN;
        break;
      case State.LOGGEDIN:
        state = await selectDateToMakeSureItsOK(url, date) ? State.DATE_AVAIL_OR_NR : State.LOGGEDIN;
        if (state == State.LOGGEDIN) {
          console.log('wait 5 seconds');
          await page.waitForTimeout(5000);
        }
        break;
      case State.DATE_AVAIL_OR_NR:
        state = await addDateToCart(date, space, acceptableTimes) ? State.ITEM_IN_CART : State.LOGGEDIN;
        break;
      case State.ITEM_IN_CART:
        console.log("YAY, item in cart")
        await keepItemInCart();
        await page.waitForTimeout(8 * 60 * 1000); //wait 8 minutes
        break;
    }
  }
}

async function testAvailableDate() {
  await getParkAvailableTimeslots(entryURL.dino, '05/29/2021', 5, ["9:30 AM",]);
}
async function testImpossibleTimeSlots() {
  await getParkAvailableTimeslots(entryURL.dino, '05/29/2021', 5, ["8:30 AM xxx",]);
}
async function testPastDates() {
  await getParkAvailableTimeslots(entryURL.dino, '05/15/2021', 5, ["8:30 AM",]);
}
async function testTooFarFutureDates() {
  await getParkAvailableTimeslots(entryURL.dino, '05/15/2023', 5, ["8:30 AM",]);
}
async function testNRDates() {
  await getParkAvailableTimeslots(entryURL.zion, '06/27/2021', 5, ["9:00 AM - 10:00 AM"]);
}
async function getActualTargetDateForZion() {
  await getParkAvailableTimeslots(
    entryURL.zion,
    '06/17/2021',
    5,
    [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM"
    ]
  );
}
async function getActualTargetDateForZion2() {
  await getParkAvailableTimeslots(
    entryURL.zion,
    '05/28/2021',
    8,
    [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM"
    ]
  );
}
(async () => {
  await testAvailableDate();
  // await testPastDates();
  // await testImpossibleTimeSlots();
  // await testTooFarFutureDates();
  // await testNRDates();
  // await getActualTargetDateForZion2();
})();
