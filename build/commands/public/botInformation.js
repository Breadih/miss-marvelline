"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
const package_json_1 = __importDefault(require("../../../package.json"));
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('See information about me!'),
    async execute(interaction) {
        const IntroductionEmbed = new discord_js_1.EmbedBuilder()
            .setDescription('Hiya! A public Discord Bot to make management, and other stuff in your guild easier!')
            .setFields({ name: "Discord Bot Name", value: interaction.client.user.username, inline: true }, { name: "Discord.js Version", value: package_json_1.default.dependencies["discord.js"], inline: true }, { name: "Version", value: package_json_1.default.version, inline: true });
        await interaction.reply({
            embeds: [IntroductionEmbed]
        });
    },
});
