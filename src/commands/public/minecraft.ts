import Command from "#newCommand";
import { SlashCommandBuilder } from "discord.js";

export default new Command({
    data: new SlashCommandBuilder()
    .setName('minecraft')
    .addSubcommand(command =>
        command.setName('lookup')
        .setDescription('Lookup for someone\'s information in Minecraft')
        .addRoleOption(option => option.)
    ),
    async execute(interaction) {
        
    },

})