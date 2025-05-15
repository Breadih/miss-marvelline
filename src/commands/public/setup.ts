import Command from "#newCommand";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default new Command({
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configure your guild how you wish!'),
    async execute(interaction) {
        const IntroductionEmbed = new EmbedBuilder()
        .setDescription('Hiya! Welcome to Miss Marvelline setup! This will allow you setup me properly into your server! Please click on of the buttons below to start.')
        .setFooter({ text: 'This will fade in 120 seconds.'})

        await interaction.reply({
            embeds: [IntroductionEmbed]
        })


    },
})