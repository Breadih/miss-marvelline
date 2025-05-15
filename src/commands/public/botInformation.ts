import Command from "#newCommand";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Package from '../../../package.json'

export default new Command({
    data: new SlashCommandBuilder()
    .setName('bot-info')
    .setDescription('See information about me!'),
    async execute(interaction) {
        const IntroductionEmbed = new EmbedBuilder()
        .setDescription('Hiya! A public Discord Bot to make management, and other stuff in your guild easier!')
        .setFields(
            { name: "Discord Bot Name", value: interaction.client.user.username, inline: true},
            { name: "Discord.js Version", value: Package.dependencies["discord.js"], inline: true},
            { name: "Version", value: Package.version, inline: true},

        )

        await interaction.reply({
            embeds: [IntroductionEmbed]
        })


    },
})