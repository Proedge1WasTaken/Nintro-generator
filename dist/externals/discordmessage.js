"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SikeresKódDiscord = void 0;
// < Do the imports >
const env = require("dotenv");
const discord_js_1 = require("discord.js");
// < Declare variables and shit >
env.config();
const client = new discord_js_1.Client({
    intents: ["GUILDS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
});
// < Log if the discord client has started >
client.on('ready', async (client) => {
    const ts = Date.now();
    let date_obj = new Date(ts);
    console.log(`\x1b[33m%s\x1b[0m`, `[Info] -> Discord bot started! (${date_obj.getFullYear()} ${date_obj.getMonth()} ${date_obj.getDate()} ${date_obj.getHours()}:${date_obj.getMinutes()}:${date_obj.getSeconds()})`);
});
// < The function is called from index.ts when the verify stuff returns true >
async function SikeresKódDiscord(code) {
    if (!env)
        return;
    let guild = client.guilds.fetch(process.env.GUILDID);
    let gchannel = (await guild).channels.cache.get(process.env.CHANNEL);
    let tosend = gchannel;
    tosend.send(`@everyone! I found a working code: https://discord.gift/${code}`);
}
exports.SikeresKódDiscord = SikeresKódDiscord;
// < Login to the client >
client.login(process.env.TOKEN);
