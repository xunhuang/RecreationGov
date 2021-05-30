
import moment = require("moment");
import { login } from "./login";
import { api_placer_holder, cancel_reservation } from "./makeReservation";

(async () => {
    let sleep_between_runs = 10 * 60 * 1000; // 10 minutes;
    let account = await login();
    while (1) {
        console.log(moment().format() + ": resetting cart expiration ");
        try {
            let reservation = await api_placer_holder(account.email, account.accessToken);
            if (!reservation) {
                throw "reservation not made, not good";
            }
            await cancel_reservation(reservation.reservationId, account.accessToken);
            await new Promise(r => setTimeout(r, sleep_between_runs));
        } catch (e) {
            console.log(e);
            // eat the error and try again in 10 seconds
            await new Promise(r => setTimeout(r, 10 * 1000));
        }
    }
})();
