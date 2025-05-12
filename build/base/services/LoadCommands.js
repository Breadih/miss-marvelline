"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadCommands;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
async function loadCommands() {
    const publicCommands = [];
    const adminCommands = [];
    const commandsPath = node_path_1.default.join(__dirname, "..", "..", "commands", "public");
    const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
    for (const file of commandFiles) {
        const compiledFilePath = node_path_1.default.join(commandsPath, file);
        try {
            // Use require to load compiled JS files
            const commandModule = await require(compiledFilePath); // Using require for JS compatibility
            const command = commandModule.default || commandModule;
            if (!command.data) {
                console.error(`Command ${file} has no 'data' property.`);
                continue; // Skip this command if 'data' is missing
            }
            console.log(`Command ${file} data:`, command.data); // Log the command data for debugging
            const json = command.data.toJSON();
            // Categorize based on the `category` property
            if (command.category === "admin") {
                adminCommands.push(json);
            }
            else {
                publicCommands.push(json);
            }
        }
        catch (error) {
            console.error(`Error loading command from ${compiledFilePath}:`, error);
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
        console.log("✅ Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.error("❌ Failed to reload commands:", error);
    }
}
