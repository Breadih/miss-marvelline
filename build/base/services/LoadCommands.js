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
exports.default = loadCommands;
// src/base/services/loadCommands.ts
const discord_js_1 = require("discord.js");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const node_url_1 = require("node:url");
async function loadCommands() {
    const publicCommands = [];
    const adminCommands = [];
    const folders = ['public', 'admin'];
    for (const folder of folders) {
        const commandsPath = node_path_1.default.join(__dirname, '..', '..', 'commands', folder);
        const commandFiles = (0, node_fs_1.readdirSync)(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file);
            const commandModule = await Promise.resolve(`${(0, node_url_1.pathToFileURL)(filePath).href}`).then(s => __importStar(require(s)));
            const command = commandModule.default;
            // Debugging output: Check if 'command.data' exists
            console.log(`Checking command: ${file}`);
            if (!command.data) {
                console.error(`Command ${file} has no 'data' property`);
                continue; // Skip this command if 'data' is missing
            }
            console.log(`Command ${file} data:`, command.data); // Log the command data for debugging
            const json = command.data.toJSON();
            if (command.category === 'public') {
                publicCommands.push(json);
            }
            else {
                adminCommands.push(json);
            }
        }
    }
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.Token);
    try {
        console.log('🔁 Refreshing application (/) commands...');
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.ClientID), {
            body: publicCommands,
        });
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.ClientID, process.env.MainGuild), {
            body: adminCommands,
        });
        console.log('✅ Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error('❌ Failed to reload commands:', error);
    }
}
