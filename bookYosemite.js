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
exports.bookYosemite = void 0;
function bookYosemite(username, accessToken, date) {
    return __awaiter(this, void 0, void 0, function () {
        var body, response, res;
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
                            "code": "03AGdBq25_oW9YHwX0ZN9A1oJKPzMrm0UMsvqlxrAv5erDOxqT3SPYOCRSDG3cr0HyuUjFOPN1-XIwwXxso1TUIaSgYLj8p2nEjl6sRFSosAcGrjvnX9j6wYZD_a8OZjmmCH9KOL2biccmvz72WZuC8cSeEiNPRrDgVQgtfdvmUip2G8ddh4qLLuInf2eq8PO-Kt49cdN73AV_1pX9ySMqDkqmI40dCGtSlzCbhtPOlVbPenxCQ5VDMzLOkjM3eJmJ985A52AKxkqf_A2HY-FAhpcEAIelHJwHCZLshd_xigYCw8XCRyrslwKD9ylA8x2OLkOstFkaPuD26yhOHbjVSg9dTDJdpWieLS-0cITd4-yEWvcpBWenPnsbImjbH8MEDC-YbVdTxSZDgt-HtbTvSzu-2hHXIf9VNys4TSiDuBJ68nAKyAIT1dZ7J8UY4Vhn3tgQEvN8LISZ9V1J8PBOaP_cuLwBZmIghNQkH3gYouv64bf8XL-uE7o",
                            "region": "EAST"
                        }
                    };
                    return [4 /*yield*/, fetch("https://www.recreation.gov/api/ticket/reservation", {
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
                            "body": JSON.stringify(body),
                            "method": "POST",
                            "mode": "cors"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    if (res.error) {
                        throw "Reservation error";
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.bookYosemite = bookYosemite;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sleep_between_runs;
    return __generator(this, function (_a) {
        sleep_between_runs = 10 * 60 * 1000;
        return [2 /*return*/];
    });
}); })();
//# sourceMappingURL=bookYosemite.js.map