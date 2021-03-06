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
var moment = require("moment");
var login_1 = require("./login");
var makeReservation_1 = require("./makeReservation");
var cartHeader_1 = require("./cartHeader");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sleep_between_runs, account, cart, reservation, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sleep_between_runs = 10 * 60 * 1000;
                _a.label = 1;
            case 1:
                if (!1) return [3 /*break*/, 12];
                return [4 /*yield*/, login_1.login()];
            case 2:
                account = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 11]);
                return [4 /*yield*/, cartHeader_1.shopperCart(account.accessToken)];
            case 4:
                cart = _a.sent();
                console.log(cart);
                console.log(moment().format() + ": trying to reset cart expiration ");
                if (!(cart && cart["reservations"] && cart["reservations"].length > 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, makeReservation_1.book_temporary_reservation(account.email, account.accessToken)];
            case 5:
                reservation = _a.sent();
                if (!reservation) {
                    throw "reservation not made, not good";
                }
                return [4 /*yield*/, makeReservation_1.cancel_reservation(reservation.reservationId, account.accessToken)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, sleep_between_runs); })];
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
//# sourceMappingURL=v2-keepalive.js.map