"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _loadCommands_1 = __importDefault(require("#loadCommands"));
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('reload-commands')
        .setDescription('reload all the commands.'),
    async execute(interaction) {
        await interaction.deferReply();
        await (0, _loadCommands_1.default)();
        await interaction.editReply(`Successfully reloaded all commands.`);
    },
});
