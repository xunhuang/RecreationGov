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
exports.bookYosemite = exports.isDateAvailable = void 0;
var moment = require("moment");
var login_1 = require("./login");
var fetch = require("node-fetch");
var mailgun_1 = require("./mailgun");
function isDateAvailable(accessToken, date) {
    return __awaiter(this, void 0, void 0, function () {
        var d, response, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    d = moment(date, "YYYY-MM-DD");
                    return [4 /*yield*/, fetch("https://www.recreation.gov/api/timedentry/availability/facility/10086745/monthlyAvailabilitySummaryView?year=" + d.format("YYYY") + "&month=" + d.format("MM") + "&inventoryBucket=FIT", {
                            "headers": {
                                "accept": "*/*",
                                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                            },
                            "referrer": "https://www.recreation.gov/timed-entry/10086745/ticket/10086746",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": null,
                            "method": "GET",
                            "mode": "cors"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    if (res.error) {
                        console.log("Reservation error : " + res.error);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, res["facility_availability_summary_view_by_local_date"][date]["tour_availability_summary_view_by_tour_id"]['10086746']["has_reservable"]];
            }
        });
    });
}
exports.isDateAvailable = isDateAvailable;
function bookYosemite(username, accessToken, date) {
    return __awaiter(this, void 0, void 0, function () {
        var body, bodystr, response, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        "reservation": {
                            "facility_id": "10086745",
                            "tour_id": "10086746",
                            "status": "DRAFT",
                            "tour_date": date,
                            "tour_time": "0500",
                            "ticket_count_by_guest_type_id": {
                                "10086745_vehicle_7day_entry": 1
                            },
                            "passes_by_guest_type_id": {},
                            "user_email": username,
                        },
                        "reservationoptions": {
                            "targetstatus": "HOLD"
                        },
                        "system": {
                            "section": "timedEntryTicketDetailsPage",
                            "region": "EAST"
                        }
                    };
                    bodystr = JSON.stringify(body);
                    return [4 /*yield*/, fetch("https://www.recreation.gov/api/timedentry/reservation", {
                            "headers": {
                                "accept": "application/json, text/plain, */*",
                                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                                "authorization": "Bearer " + accessToken,
                                "cache-control": "no-cache, no-store, must-revalidate",
                                "content-type": "application/json;charset=UTF-8",
                                "pragma": "no-cache",
                                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                            },
                            "referrer": "https://www.recreation.gov/timed-entry/10086745/ticket/10086746",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": bodystr,
                            "method": "POST",
                            "mode": "cors"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    if (res.error) {
                        console.log("Reservation error : " + res.error);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.bookYosemite = bookYosemite;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var date, sleep_between_runs, account, avail, reservation, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = process.argv[2];
                sleep_between_runs = 300000;
                _a.label = 1;
            case 1:
                if (!1) return [3 /*break*/, 12];
                return [4 /*yield*/, login_1.login()];
            case 2:
                account = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 11]);
                return [4 /*yield*/, isDateAvailable(account.accessToken, date)];
            case 4:
                avail = _a.sent();
                if (!avail) return [3 /*break*/, 7];
                console.log('Slots availalbe. Make actual booking....');
                return [4 /*yield*/, bookYosemite(account.email, account.accessToken, date)];
            case 5:
                reservation = _a.sent();
                if (!reservation) return [3 /*break*/, 7];
                console.log('******* reservation made;');
                return [4 /*yield*/, mailgun_1.send(["xhuang@gmail.com"], date + " Yosemite reservation is added to chart!", "Check your chart at: https://www.recreation.gov/ and checkout ASAP.")];
            case 6:
                _a.sent();
                process.exit(0);
                _a.label = 7;
            case 7:
                console.log(".....  no reservation made, try again in " + sleep_between_runs / 1000 + " seconds");
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, sleep_between_runs); })];
            case 8:
                _a.sent();
                return [3 /*break*/, 11];
            case 9:
                e_1 = _a.sent();
                console.log(e_1);
                // eat the error and try again in 10 seconds
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10 * 1000); })];
            case 10:
                // eat the error and try again in 10 seconds
                _a.sent();
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 1];
            case 12: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=bookYosemite.js.map