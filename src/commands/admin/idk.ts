import Command from "#newCommand";
import { SlashCommandBuilder } from "discord.js";

export default new Command({
    data: new SlashCommandBuilder()
    .setName('a')
    .setDescription('idk'),
    async execute(interaction) {
        interaction.reply('a')
    },
})