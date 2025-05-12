import Command from '#newCommand';
import { SlashCommandBuilder } from 'discord.js';

export default new Command({
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Pong!`),
    async execute(interaction) {
        await interaction.reply(`Pong!`)
    },
    category: "admin"
})