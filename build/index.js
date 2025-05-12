import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping] });

client.login(process.env.Token)