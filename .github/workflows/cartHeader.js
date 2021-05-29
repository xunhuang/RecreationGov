

const fetch = require('node-fetch');

(async () => {
    let a = await fetch("https://www.recreation.gov/api/cart/shoppingcart/header", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJleHRlcm5hbCIsImV4cCI6MTYyMjMzODMyNSwianRpIjoiYWU5YWRjODMtNDNmZC00ZjA0LTkyOTgtMDM1MWFlNmI4NDY2IiwiaWF0IjoxNjIyMjUxOTE1LCJpc3MiOiJyMXMiLCJuYmYiOjE2MjIyNTE5MTUsInN1YiI6ImJzZjd2Y2sxcjIxMDAwZnU5aHEwIiwiYWNjdCI6eyJhY2NvdW50X2lkIjoiYnNmN3ZjazFyMjEwMDBmdTlocTAiLCJjZWxsX3Bob25lIjoiNjUwOTA2NDUwMyIsImNzcl9hY3Rvcl9pZCI6IiIsImVtYWlsIjoieGh1YW5nQGdtYWlsLmNvbSIsImVtZXJnZW5jeV9jb250YWN0Ijp7ImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIiLCJwaG9uZSI6IiJ9LCJmYXZvcml0ZXMiOm51bGwsImZpcnN0X25hbWUiOiJYdW4iLCJob21lX2FkZHJlc3MiOnsiYWRkcmVzczEiOiIiLCJhZGRyZXNzMiI6IiIsImNpdHkiOiIiLCJjb3VudHJ5IjoiVVNBIiwic3RhdGUiOiJDQSIsInppcF9jb2RlIjoiOTQ1MDIifSwiaG9tZV9waG9uZSI6IiIsImlzX2NvbW1lcmNpYWxfYWNjb3VudCI6ZmFsc2UsImxhc3RfbmFtZSI6Ikh1YW5nIiwibGVnYWN5X2FjY291bnQiOmZhbHNlLCJuZXdzbGV0dGVyX2FsZXJ0cyI6ZmFsc2UsInBhc3NlcyI6W10sInBob25lX2FsZXJ0cyI6ZmFsc2UsInByb2ZpbGVfcGljdHVyZV9pZCI6IiIsInNtc19hbGVydHMiOmZhbHNlLCJ0cmlwX3ByZWZlcmVuY2VzIjpudWxsLCJsb2dpbl9zb3VyY2UiOiJ3d3cucmVjcmVhdGlvbi5nb3YiLCJyZWdpc3RyYXRpb25fc291cmNlIjoiIiwicmVkaXJlY3RfdXJsIjoiIn19.CjeMF-XS4tAjAsdLkT9oj0M-bX7TwxGnrSGGRJJXhZ_sWo0Y3CkEI955A-jV1ZlHfUpW2zeIMqnsf7lLoggbxdNtbS4fqMnxtgEHjsTthQky0jufEoMGKmBQdSOoTvGRTkd3Niv4cY8RH9y0_kpi4dRbuLSMHK6Cx9L1PUe2KQ99bqpJYfZyHZ8r_t68zBCQ2FwKoOAqgfcXlh3SFM8Hr1zvACNJHxeoPsfnVRnvZYKvLF5gfzk3_nF3_ujKnxaJJ8K6KGoD2KTs6mcANvmXZ35x-imJ43tULRilNxU_YMg7oD1Sif3xypeYVgtZDFG4GpcpKISJHU71WWdzyHA09W07-v3YF-6mNPe17MwxhpcoJVVj9_tC6u3eeB2Qhra_OnkFaYO6H0-iYmk4JzvvMH2-ANFjBl7Lb8DWUAGwrrXg6PmQZHA4ToqdJXD7OhrCiOmzlGA7OHm-yyuFvDf7_CnOzfm3Wr15XJGhRWZp2NUyNCMuTYXcgsGLsIe8deA2S-O7ITA0nFtYOOt254LvgP9jwxzdzufPvFTj9Ox53kV3C2JiKQh-QR7SGRtUl5XVBZ7a9sxYSb6HWYjRp2SD7WEv9pkTaknRcR2RWG6cPdonBZ3PBVTwz7DyUKgBpDAMd9vTjBam3zIzwGoLXn93CebQl4mXjd2nZNRDRsg7KZ4",
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
    json = await a.json();
    console.log(json);
    console.log("xxx");

})();