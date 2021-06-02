
import moment = require("moment");
import { login } from "./login";
import { book_temporary_reservation, cancel_reservation } from "./makeReservation";
import { shopperCart } from "./cartHeader"

(async () => {
    let sleep_between_runs = 10 * 60 * 1000; // 10 minutes;
    // let sleep_between_runs = 3000; // 3 second
    while (1) {
        let account = await login();
        try {
            let cart = await shopperCart(account.accessToken);
            console.log(cart);
            console.log(moment().format() + ": trying to reset cart expiration ");
            if (cart && cart["reservations"] && cart["reservations"].length > 0) {
                // with reservations, let's try to keep it.
                let reservation = await book_temporary_reservation(account.email, account.accessToken);
                if (!reservation) {
                    throw "reservation not made, not good";
                }
                await cancel_reservation(reservation.reservationId, account.accessToken);
            }
            await new Promise(r => setTimeout(r, sleep_between_runs));
        } catch (e) {
            console.log(e);
            // eat the error and try again in 10 seconds
            await new Promise(r => setTimeout(r, 10 * 1000));
        }
    }
})();