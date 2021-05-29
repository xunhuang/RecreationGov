"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var moment = require("moment");
var USERNAME = process.env.RECREATION_GOV_USERNAME;
var PASSWORD = process.env.RECREATION_GOV_PASSWORD;
if (!USERNAME || !PASSWORD) {
    console.log("set your recreation.gov user name and password with environment variable ");
    console.log("export RECREATION_GOV_USERNAME=blah");
    console.log("export RECREATION_GOV_PASSWORD=blah");
    process.exit(-1);
}
var entryURL = {
    zion: "https://www.recreation.gov/ticket/300016/ticket/3010",
    dino: "https://www.recreation.gov/ticket/300020/ticket/3050",
};
var page;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.click("#ga-global-nav-log-in-link")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.focus("#rec-acct-sign-in-email-address")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.type(username)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.focus("#rec-acct-sign-in-password")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.type(password)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click(".rec-acct-sign-in-btn")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function startupAndLogin(url) {
    return __awaiter(this, void 0, void 0, function () {
        var browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        // headless: false,
                        headless: true,
                        // args: ['--headless'],
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({
                            width: 1200,
                            height: 800,
                            deviceScaleFactor: 1,
                        })];
                case 3:
                    _a.sent();
                    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36");
                    return [4 /*yield*/, page.goto(url)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, login(USERNAME, PASSWORD)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function typeDate(date) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector('#tourCalendarWithKey')];
                case 1:
                    _a.sent();
                    // set date
                    return [4 /*yield*/, page.focus('#tourCalendarWithKey')];
                case 2:
                    // set date
                    _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < 10)) return [3 /*break*/, 6];
                    return [4 /*yield*/, page.keyboard.press('Backspace')];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, page.keyboard.type(date)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(500)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// false: reload again
// true: advance to next state
function selectDateToMakeSureItsOK(url, date) {
    return __awaiter(this, void 0, void 0, function () {
        var items, alerts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("should go to URL " + url);
                    return [4 /*yield*/, page.goto(url)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('#tourCalendarWithKey')];
                case 2:
                    _a.sent();
                    console.log("type date.... " + date);
                    return [4 /*yield*/, typeDate(date)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.$$('label[data-component="RadioPill"]')];
                case 4:
                    items = _a.sent();
                    if (items.length > 0) {
                        console.log("Found " + items.length + " entries");
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, page.$$('div[data-component="Alert"]')];
                case 5:
                    alerts = _a.sent();
                    if (alerts.length > 0) {
                        return [2 /*return*/, true];
                    }
                    console.log("Date seems to be unavailable (it's not Available or NR), should reload page again");
                    return [2 /*return*/, false];
            }
        });
    });
}
function getAvailableNodes() {
    return __awaiter(this, void 0, void 0, function () {
        var items, nodes, _i, items_1, i, p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$$('label[data-component="RadioPill"] > input:not([disabled])')];
                case 1:
                    items = _a.sent();
                    nodes = [];
                    _i = 0, items_1 = items;
                    _a.label = 2;
                case 2:
                    if (!(_i < items_1.length)) return [3 /*break*/, 5];
                    i = items_1[_i];
                    return [4 /*yield*/, i.getProperty("parentNode")];
                case 3:
                    p = _a.sent();
                    nodes.push(p);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, nodes];
            }
        });
    });
}
function keepItemInCart() {
    return __awaiter(this, void 0, void 0, function () {
        var date, success, nodes, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = moment().add(5, "days").format("MM/DD/YYYY");
                    console.log(date);
                    success = false;
                    _a.label = 1;
                case 1:
                    if (!!success) return [3 /*break*/, 3];
                    return [4 /*yield*/, selectDateToMakeSureItsOK(entryURL.dino, date)];
                case 2:
                    success = _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    console.log("proceed...");
                    return [4 /*yield*/, getAvailableNodes()];
                case 4:
                    nodes = _a.sent();
                    console.log(nodes.length);
                    if (!(nodes.length > 0)) return [3 /*break*/, 16];
                    return [4 /*yield*/, nodes[0].click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('.sarsa-button-primary')];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 13, , 16]);
                    return [4 /*yield*/, page.waitForSelector('#show-summary-button', { timeout: 2000 })];
                case 8:
                    _a.sent();
                    console.log("Time extended!....");
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 9:
                    _a.sent();
                    // delete the item and confirm.
                    return [4 /*yield*/, page.click('section .sarsa-inline button')];
                case 10:
                    // delete the item and confirm.
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 11:
                    _a.sent();
                    console.log("Delete clicked!");
                    return [4 /*yield*/, page.click('.ReactModalPortal .sarsa-button-primary')];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 13:
                    e_1 = _a.sent();
                    if (!(e_1 instanceof puppeteer.errors.TimeoutError)) return [3 /*break*/, 15];
                    console.log("clicked the add to cart too late, close the modal dialog and try again");
                    return [4 /*yield*/, page.click('.ReactModalPortal button')];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: throw e_1;
                case 16: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, startupAndLogin(entryURL.dino)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!1) return [3 /*break*/, 9];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 8]);
                return [4 /*yield*/, keepItemInCart()];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(3 * 60 * 1000)];
            case 5:
                _a.sent(); // 3 minutes between runs
                return [3 /*break*/, 8];
            case 6:
                e_2 = _a.sent();
                console.log("other exception");
                console.log(e_2);
                return [4 /*yield*/, page.waitForTimeout(10000)];
            case 7:
                _a.sent();
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 2];
            case 9: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=keepalive.js.map