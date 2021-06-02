
import fetch from 'node-fetch';
export async function shopperCart(accessToken: string): Promise<Object | null> {
    // let a = await fetch("https://www.recreation.gov/api/cart/shoppingcart/header", {
    let a = await fetch("https://www.recreation.gov/api/cart/shoppingcart", {
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
        "method": "GET",
        "mode": "cors"
    });
    let json = await a.json();
    // console.log(json);
    return json;
}