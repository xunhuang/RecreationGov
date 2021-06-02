
import moment = require("moment");
import { login } from "./login";
import fetch = require('node-fetch');
import { send } from "./mailgun";

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
            "region": "EAST"
        }
    };

    let bodystr = JSON.stringify(body);

    let response = await fetch("https://www.recreation.gov/api/timedentry/reservation", {
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
        "body": bodystr,
        "method": "POST",
        "mode": "cors"
    });
    let res = await response.json();
    console.log(res);
    if (res.error) {
        console.log(`Reservation error : ${res.error}`);
        return false;
    }
    return true;;
}

(async () => {
    let date = process.argv[2];
    let sleep_between_runs = 15000; // 15 second
    while (1) {
        let account = await login();
        try {
            let reservation = await bookYosemite(
                account.email,
                account.accessToken,
                date,
            );
            if (reservation) {
                console.log('******* reservation made;')

                await send(
                    ["xhuang@gmail.com"],
                    `${date} Yosemite reservation is added to chart!`,
                    "Check your chart at: https://www.recreation.gov/ and checkout ASAP.")

                process.exit(0);
            }
            console.log(`.....  no reservation made, try again in ${sleep_between_runs / 1000} seconds`);
            await new Promise(r => setTimeout(r, sleep_between_runs));
        } catch (e) {
            console.log(e);
            // eat the error and try again in 10 seconds
            await new Promise(r => setTimeout(r, 10 * 1000));
        }
    }
})();