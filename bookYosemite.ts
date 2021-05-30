
import moment = require("moment");
import { login } from "./login";
import { api_placer_holder, cancel_reservation } from "./makeReservation";

export async function bookYosemite(username: string, accessToken: string, date: string): Promise<boolean> {
    let body = {
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
    let response = await fetch("https://www.recreation.gov/api/ticket/reservation", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "authorization": `Bearer ${accessToken}`,
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
    });
    let res = await response.json();
    console.log(res);
    if (res.error) {
        throw "Reservation error";
    }
    return false;
}

(async () => {
    let sleep_between_runs = 10 * 60 * 1000; // 10 minutes;
    // let sleep_between_runs = 5 * 1000; 

    /*
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
    */

})();
