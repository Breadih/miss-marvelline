"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const url_1 = require("url");
const _loadCommands_1 = __importDefault(require("#loadCommands"));
const consola_1 = __importDefault(require("consola"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildModeration,
    ],
});
// Prepare commands collection
client.commands = new discord_js_1.Collection();
console.log(__dirname);
// Load commands dynamically from /commands/*
const commandsPath = node_path_1.default.join(__dirname, "commands");
const commandFolders = node_fs_1.default.readdirSync(commandsPath);
async function LoadCmd() {
    for (const folder of commandFolders) {
        const folderPath = node_path_1.default.join(commandsPath, folder);
        const commandFiles = node_fs_1.default
            .readdirSync(folderPath)
            .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(folderPath, file);
            const commandModule = await Promise.resolve(`${(0, url_1.pathToFileURL)(filePath).href}`).then(s => __importStar(require(s)));
            const command = commandModule.default;
            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
            }
            else {
                console.warn(`[WARN] Command at ${filePath} is missing "data" or "execute".`);
            }
        }
    }
    // Load events from /events
    const eventsPath = node_path_1.default.join(__dirname, "events");
    const eventFiles = node_fs_1.default
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
    for (const file of eventFiles) {
        const filePath = node_path_1.default.join(eventsPath, file);
        const eventModule = await Promise.resolve(`${(0, url_1.pathToFileURL)(filePath).href}`).then(s => __importStar(require(s)));
        const event = eventModule.default;
        if ("name" in event && typeof event.execute === "function") {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            }
            else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        else {
            console.warn(`[WARN] Event at ${filePath} is missing "name" or "execute".`);
        }
    }
}
(0, _loadCommands_1.default)();
LoadCmd();
client.on('ready', () => {
    if (client.user) {
        consola_1.default.success(`Logged in as ${client.user.tag}`);
    }
});
// Log in to Discord
client.login(process.env.Token);
