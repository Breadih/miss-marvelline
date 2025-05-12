"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Pong!`),
    async execute(interaction) {
        await interaction.reply(`Pong!`);
    }
});
