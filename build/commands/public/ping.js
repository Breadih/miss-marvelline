"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const _colours_1 = require("#colours");
const discord_js_1 = require("discord.js");
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Pong!`),
    async execute(interaction) {
        const PongVariable = new discord_js_1.EmbedBuilder()
            .setColor(_colours_1.colors.MainColour)
            .setDescription(`Pong! This took me \`${interaction.client.ws.ping}ms\` to answer. Here is more information about it.\n\n> API response: \`${interaction.client.ws.ping}\`\n> User Response: \`${new Date().getTime() - interaction.createdTimestamp}ms\`\n\nTo know more information about me run </bot-info:1372476878769885250>.`);
        interaction.reply({
            embeds: [PongVariable]
        });
    }
});
