import loadCommands from "#loadCommands";
import Command from "#newCommand";
import { SlashCommandBuilder } from "discord.js";

export default new Command({
    data: new SlashCommandBuilder()
    .setName('reload-commands')
    .setDescription('reload all the commands.'),
    async execute(interaction) {
        await interaction.deferReply();
        await loadCommands()
        await interaction.editReply(`Successfully reloaded all commands.`)
    },
})