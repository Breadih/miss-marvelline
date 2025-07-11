import fs from "node:fs";
import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import loadCommands from "#loadCommands";
import log from "consola";
import chalk from "chalk";


dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
  ],
});

// Prepare commands collection
client.commands = new Collection();

console.log(__dirname)

// Load commands dynamically from /commands/*
const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

async function LoadCmd() {
  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const commandModule = await require(filePath);
      const command = commandModule.default;

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.warn(
          `[WARN] Command at ${filePath} is missing "data" or "execute".`
        );
      }
    }
  }

  // Load events from /events
  const eventsPath = path.join(__dirname, "base", "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = await require(filePath)
    const event = eventModule.default;

    if ("name" in event && typeof event.execute === "function") {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    } else {
      console.warn(
        `[WARN] Event at ${filePath} is missing "name" or "execute".`
      );
    }
  }
}

loadCommands();

LoadCmd();

try {
client.login(process.env.Token);

} catch {
  log.fail(`An invalid Discord Bot Token was provided, please review the token. Token sent: ${chalk.bold(process.env.Token)}`)
}
