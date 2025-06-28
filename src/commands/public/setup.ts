import Command from "#newCommand";
import { EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";

export default new Command({
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configure your guild how you wish!'),
    async execute(interaction) {
        if (interaction.guild === null) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('This command can only be used in a server!'),
                ],
            });
            return;
        }

        if (interaction.guild.ownerId !== interaction.user.id) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('You must be the server owner to use this command!'),
                ],
            });
            return;
        };

        const IntroductionEmbed = new EmbedBuilder()
        .setDescription('Hiya! Welcome to Miss Marvelline setup! This will allow you setup me properly into your server! Please click on of the buttons below to start.')
        .setFooter({ text: 'This will fade in 120 seconds.'});

        await interaction.reply({
            embeds: [IntroductionEmbed]
        })


    },
})