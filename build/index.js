"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.GuildMembers, discord_js_1.GatewayIntentBits.GuildModeration, discord_js_1.GatewayIntentBits.DirectMessages, discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages] });
const collection = new discord_js_1.Collection();
client.once(discord_js_1.Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
console.log(consola_1.default.warn(process.env.Token));
// Log in to Discord with your client's token
client.login(process.env.Token);
