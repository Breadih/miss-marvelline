"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadCommands;
const discord_js_1 = require("discord.js");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
async function loadCommands() {
    const publicCommands = [];
    const adminCommands = [];
    const folders = ["public", "admin"];
    for (const folder of folders) {
        const commandsPath = node_path_1.default.join(__dirname, "..", "..", "commands", folder);
        const commandFiles = (0, node_fs_1.readdirSync)(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file.replace(/\.ts$/, ".js")); // Convert .ts to .js for compiled code
            console.log(`Attempting to load command from: ${filePath}`); // Log the file path for debugging
            let commandModule;
            try {
                // Require the compiled JavaScript file
                commandModule = require(filePath);
            }
            catch (error) {
                console.error(`Error loading command from ${filePath}:`, error);
                continue; // Skip this command if it fails to load
            }
            const command = commandModule.default || commandModule;
            // Debugging output: Check if 'command.data' exists
            console.log(`Checking command: ${file}`);
            if (!command.data) {
                console.error(`Command ${file} has no 'data' property`);
                continue; // Skip this command if 'data' is missing
            }
            console.log(commandsPath);
            const json = command.data.toJSON();
            if (commandsPath.endsWith('public')) {
                publicCommands.push(json);
            }
            else if (commandsPath.endsWith('admin')) {
                adminCommands.push(json);
            }
        }
    }
    const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.Token);
    try {
        console.log("🔁 Refreshing application (/) commands...");
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.ClientID), {
            body: publicCommands,
        });
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.ClientID, process.env.MainGuild), {
            body: adminCommands,
        });
        console.log(`✅ Successfully reloaded application (/) ${adminCommands.length + publicCommands.length} commands.`);
        console.log(`Launched ${publicCommands.length} public ${publicCommands.length == 1 ? 'command' : 'commands'}`);
        console.log(`Launched ${adminCommands.length} admin ${adminCommands.length == 1 ? 'command' : 'commands'}`);
    }
    catch (error) {
        console.error("❌ Failed to reload commands:", error);
    }
}
