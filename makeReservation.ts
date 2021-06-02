
import moment = require("moment");
import fetch = require('node-fetch');

class ReservationResponse {
    public reservationId: string;
    constructor(reservationId: string) {
        this.reservationId = reservationId;
    }
};

class CancellationResponse {
    public reservationId: string;
    constructor(reservationId: string) {
        this.reservationId = reservationId;
    }
};

export async function book_temporary_reservation(username: string, accessToken: string): Promise<ReservationResponse | null> {
    try {
        let body = {
            reservation:
            {
                facility_id: "300020",
                tour_id: "3050",
                status: "DRAFT",
                tour_date: moment().add(5, "days").format("YYYY-MM-DD"),
                tour_time: "0800",
                ticket_count_by_guest_type_id:
                {
                    '300020_general_public': 1
                },
                passes_by_guest_type_id: {},
                user_email: username,
            },
            reservationoptions: {
                targetstatus: "HOLD"
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
            "referrer": "https://www.recreation.gov/ticket/300020/ticket/3050",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify(body),
            "method": "POST",
            "mode": "cors"
        });
        let res = await response.json();
        if (res.error) {
            throw "Reservation error";
        }
        let info = new ReservationResponse(res.reservation_id);
        return info;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export async function cancel_reservation(reserationId: string, accessToken: string) {
    try {
        let response = await fetch(`https://www.recreation.gov/api/cart/shoppingcart/${reserationId}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "authorization": `Bearer ${accessToken}`,
                "cache-control": "no-cache, no-store, must-revalidate",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
            },
            "referrer": "https://www.recreation.gov/cart",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "DELETE",
            "mode": "cors"
        });
        let res = await response.json();
        if (res.error) {
            throw "Cancellation error: " + res.error;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
    return null;
}