import Command from '#newCommand';
import { colors } from '#colours';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default new Command({
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Pong!`),
    async execute(interaction) {
        const PongVariable = new EmbedBuilder()
        .setColor(colors.MainColour)
        .setDescription(`Pong! This took me \`${interaction.client.ws.ping}ms\` to answer. Here is more information about it.\n\n> API response: \`${interaction.client.ws.ping}\`\n> User Response: \`${new Date().getTime()- interaction.createdTimestamp}ms\`\n\nTo know more information about me run COMMAND HERE.`)

        interaction.reply({
            embeds: [PongVariable]
        })
    }
})