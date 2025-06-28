"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configure your guild how you wish!'),
    async execute(interaction) {
        if (interaction.guild === null) {
            await interaction.reply({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setColor('Red')
                        .setDescription('This command can only be used in a server!'),
                ],
            });
            return;
        }
        if (interaction.guild.ownerId !== interaction.user.id) {
            await interaction.reply({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setColor('Red')
                        .setDescription('You must be the server owner to use this command!'),
                ],
            });
            return;
        }
        ;
        const IntroductionEmbed = new discord_js_1.EmbedBuilder()
            .setDescription('Hiya! Welcome to Miss Marvelline setup! This will allow you setup me properly into your server! Please click on of the buttons below to start.')
            .setFooter({ text: 'This will fade in 120 seconds.' });
        await interaction.reply({
            embeds: [IntroductionEmbed]
        });
    },
});
