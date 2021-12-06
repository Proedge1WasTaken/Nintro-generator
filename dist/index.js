"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successmessage = exports.unknowncode = exports.ratelimited = exports.start = void 0;
const env = require("dotenv");
const request = require("request");
const str = require("@supercharge/strings");
const externals = require("./externals/discordmessage");
// < Initialize config >
env.config();
// < Console log start >
const ts = Date.now();
let date_obj = new Date(ts);
console.log(`\x1b[33m%s\x1b[0m`, `[Info] -> Bot started! (${date_obj.getFullYear()} ${date_obj.getMonth()} ${date_obj.getDate()} ${date_obj.getHours()}:${date_obj.getMinutes()}:${date_obj.getSeconds()})`);
// < Declare varaibles and start the program >
let interval;
start();
// < Do the request and start the functions >
async function start() {
    interval = setInterval(function () {
        const code = str.random(16);
        var url = `https://discord.com/api/v8/entitlements/gift-codes/${code}`;
        //@ts-ignore
        request(url, async function (err, response, body) {
            if (err) {
                console.log(err);
            }
            body = JSON.parse(body);
            console.log(`\x1b[36m%s\x1b[0m`, `[Debug] -> Returned message -> ${body.message}`);
            if (body.message === "You are being rate limited.") {
                return await ratelimited();
            }
            if (body.message === "The resource is being rate limited.")
                return await ratelimited();
            if (body.message === "Unknown Gift Code")
                return unknowncode(code);
            else
                return successmessage(code);
        });
    }, 5000);
}
exports.start = start;
// < Function called when ratelimited >
async function ratelimited() {
    clearInterval(interval);
    console.error("\x1b[31m%s\x1b[0m", "[Error] -> Ratelimited, i'll just wait 15 seconds!");
    setTimeout(() => {
        start();
    }, 15000);
}
exports.ratelimited = ratelimited;
// < Function called when the code is not working >
async function unknowncode(code) {
    console.error("\x1b[33m%s\x1b[0m", `[Info] -> Unknown code! (${code})`);
}
exports.unknowncode = unknowncode;
// < Function called when the code is verified as a working code >
async function successmessage(code) {
    console.error("\x1b[32m%s\x1b[0m", `[Success] -> Found code! (${code})`);
    externals.SikeresKódDiscord(code);
}
exports.successmessage = successmessage;
