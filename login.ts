
const fetch = require('node-fetch');

const USERNAME = process.env.RECREATION_GOV_USERNAME;
const PASSWORD = process.env.RECREATION_GOV_PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.log("set your recreation.gov user name and password with environment variable ");
    console.log("export RECREATION_GOV_USERNAME=blah");
    console.log("export RECREATION_GOV_PASSWORD=blah");
    process.exit(-1);
}

class AccountInfo {
    public accessToken: string;
    public email: string;
    public accountId: string;
    public expiration: string;

    constructor(
        accessToken: string,
        email: string,
        accountId: string,
        expiration: string) {
        this.accessToken = accessToken;
        this.email = email;
        this.accountId = accountId;
        this.expiration = expiration;
    }
};

async function api_login(username: string, password: string): Promise<AccountInfo | null> {
    try {
        let response = await fetch("https://www.recreation.gov/api/accounts/login", {
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
            "body": `{\"username\":\"${username}\",\"password\":\"${password}\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36\"}`,
            "method": "POST",
            "mode": "cors"
        });
        let res = await response.json(); // return json obj
        if (res.error) {
            throw "Login error";
        }
        let account = new AccountInfo(
            res.access_token,
            res.account.email,
            res.account.account_id,
            res.expiration,
        );
        return account;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export async function login(): Promise<AccountInfo | null> {
    return await api_login(USERNAME, PASSWORD);
}