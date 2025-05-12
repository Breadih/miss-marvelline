import chalk from "chalk";
import log from 'consola';
import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
import loadCommands from "#loadCommands";

dotenv.config()

const client = new Client({ intents: [ GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]});
const collection = new Collection()

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

loadCommands()

console.log(log.warn(process.env.Token!))

// Log in to Discord with your client's token
client.login(process.env.Token!);