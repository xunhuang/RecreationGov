
import fs = require('fs');
import fetch = require('node-fetch');
import moment = require("moment");

const USERNAME = process.env.RECREATION_GOV_USERNAME;
const PASSWORD = process.env.RECREATION_GOV_PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.log("set your recreation.gov user name and password with environment variable ");
    console.log("export RECREATION_GOV_USERNAME=blah");
    console.log("export RECREATION_GOV_PASSWORD=blah");
    process.exit(-1);
}

const CacheFilename = '.account.json';

class AccountInfo {
    public accessToken: string;
    public email: string;
    public accountId: string;
    public expiration: string;

    static factory(
        accessToken: string,
        email: string,
        accountId: string,
        expiration: string) {

        let data = {
            accessToken: accessToken,
            email: email,
            accountId: accountId,
            expiration: expiration,
        }
        return new AccountInfo(data);
    }

    constructor(data) {
        Object.assign(this, data);
    }

    persistToFileSystem() {
        let data = Object.assign({}, this);
        let jsondata = JSON.stringify(data);
        fs.writeFileSync(CacheFilename, jsondata);
    }

    static factory_from_cache(): AccountInfo | null {
        try {
            let rawdata = fs.readFileSync(CacheFilename, 'utf8');
            let data = JSON.parse(rawdata);
            return new AccountInfo(data);
        } catch (e) {
            console.log(e);
        }
        return null;
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
        let account = AccountInfo.factory(
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
    let account = AccountInfo.factory_from_cache();
    if (account) {
        console.log("got account from cache");
        if (moment().add(3, "hours").isBefore(moment(account.expiration))) {
            return account;
        }
        console.log("cache expired");
    }
    account = await api_login(USERNAME, PASSWORD);
    if (account) {
        console.log("persisting new login to file");
        account.persistToFileSystem();
    }
    return account;
}