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
exports.login = void 0;
var fs = require("fs");
var fetch = require("node-fetch");
var moment = require("moment");
var USERNAME = process.env.RECREATION_GOV_USERNAME;
var PASSWORD = process.env.RECREATION_GOV_PASSWORD;
if (!USERNAME || !PASSWORD) {
    console.log("set your recreation.gov user name and password with environment variable ");
    console.log("export RECREATION_GOV_USERNAME=blah");
    console.log("export RECREATION_GOV_PASSWORD=blah");
    process.exit(-1);
}
var AccountInfo = /** @class */ (function () {
    function AccountInfo(data) {
        Object.assign(this, data);
    }
    AccountInfo.factory = function (accessToken, email, accountId, expiration) {
        var data = {
            accessToken: accessToken,
            email: email,
            accountId: accountId,
            expiration: expiration,
        };
        return new AccountInfo(data);
    };
    AccountInfo.prototype.persistToFileSystem = function () {
        var data = Object.assign({}, this);
        var jsondata = JSON.stringify(data);
        fs.writeFileSync('.account.json', jsondata);
    };
    AccountInfo.factory_from_cache = function () {
        try {
            var rawdata = fs.readFileSync('.account.json', 'utf8');
            var data = JSON.parse(rawdata);
            return new AccountInfo(data);
        }
        catch (e) {
            console.log(e);
        }
        return null;
    };
    return AccountInfo;
}());
;
function api_login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response, res, account, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://www.recreation.gov/api/accounts/login", {
                            "headers": {
                                "accept": "application/json, text/plain, */*",
                                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                                "cache-control": "no-cache, no-store, must-revalidate",
                                "content-type": "application/json;charset=UTF-8",
                                "pragma": "no-cache",
                                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                            },
                            "referrer": "https://www.recreation.gov/",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": "{\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36\"}",
                            "method": "POST",
                            "mode": "cors"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    if (res.error) {
                        throw "Login error";
                    }
                    account = AccountInfo.factory(res.access_token, res.account.email, res.account.account_id, res.expiration);
                    return [2 /*return*/, account];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account = AccountInfo.factory_from_cache();
                    if (account) {
                        console.log("got account from cache");
                        console.log(account);
                        if (moment().add(6, "hours").isBefore(moment(account.expiration))) {
                            return [2 /*return*/, account];
                        }
                        console.log("cache expired");
                    }
                    return [4 /*yield*/, api_login(USERNAME, PASSWORD)];
                case 1:
                    account = _a.sent();
                    if (account) {
                        console.log("persisting new login to file");
                        account.persistToFileSystem();
                    }
                    // console.log(account);
                    return [2 /*return*/, account];
            }
        });
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map