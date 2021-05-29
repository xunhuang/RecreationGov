
import moment = require("moment");
import { api_login } from "./login";
import { api_placer_holder, cancel_reservation } from "./makeReservation";

(async () => {
    let sleep_between_runs = 10 * 60 * 1000; // 10 minutes;
    // let sleep_between_runs = 5 * 1000; 

    const USERNAME = process.env.RECREATION_GOV_USERNAME;
    const PASSWORD = process.env.RECREATION_GOV_PASSWORD;

    if (!USERNAME || !PASSWORD) {
        console.log("set your recreation.gov user name and password with environment variable ");
        console.log("export RECREATION_GOV_USERNAME=blah");
        console.log("export RECREATION_GOV_PASSWORD=blah");
        process.exit(-1);
    }

    let account = await api_login(USERNAME, PASSWORD);

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