
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

    let a = "{\"reservation\":{\"facility_id\":\"10086745\",\"tour_id\":\"10086746\",\"status\":\"DRAFT\",\"tour_date\":\"2021-08-13\",\"tour_time\":\"0500\",\"ticket_count_by_guest_type_id\":{\"10086745_vehicle_7day_entry\":1},\"passes_by_guest_type_id\":{},\"user_email\":\"xhuang@gmail.com\"},\"reservationoptions\":{\"targetstatus\":\"HOLD\"},\"system\":{\"section\":\"timedEntryTicketDetailsPage\",\"code\":\"03AGdBq25_oW9YHwX0ZN9A1oJKPzMrm0UMsvqlxrAv5erDOxqT3SPYOCRSDG3cr0HyuUjFOPN1-XIwwXxso1TUIaSgYLj8p2nEjl6sRFSosAcGrjvnX9j6wYZD_a8OZjmmCH9KOL2biccmvz72WZuC8cSeEiNPRrDgVQgtfdvmUip2G8ddh4qLLuInf2eq8PO-Kt49cdN73AV_1pX9ySMqDkqmI40dCGtSlzCbhtPOlVbPenxCQ5VDMzLOkjM3eJmJ985A52AKxkqf_A2HY-FAhpcEAIelHJwHCZLshd_xigYCw8XCRyrslwKD9ylA8x2OLkOstFkaPuD26yhOHbjVSg9dTDJdpWieLS-0cITd4-yEWvcpBWenPnsbImjbH8MEDC-YbVdTxSZDgt-HtbTvSzu-2hHXIf9VNys4TSiDuBJ68nAKyAIT1dZ7J8UY4Vhn3tgQEvN8LISZ9V1J8PBOaP_cuLwBZmIghNQkH3gYouv64bf8XL-uE7o\",\"region\":\"EAST\"}}";
    console.log(JSON.stringify(JSON.parse(a), null, 2));

    /*
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
    */

})();
