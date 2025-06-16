"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton())
            return;
        if (!interaction.customId.startsWith("economy_create"))
            return;
        const guildId = interaction.customId.split(":")[1];
        const coinName = new discord_js_1.TextInputBuilder()
            .setCustomId("coinName")
            .setLabel("Coin Name")
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true);
        const actionRow = new discord_js_1.ActionRowBuilder().addComponents(coinName);
        const modal = new discord_js_1.ModalBuilder()
            .setCustomId(`economy_setup_modal:${guildId}`)
            .setTitle("Setup Economy")
            .addComponents(actionRow);
        try {
            await interaction.showModal(modal);
        }
        catch (error) {
            console.error("Error handling economy create interaction:", error);
            await interaction.reply({
                content: "An error occurred while processing your request.",
                ephemeral: true,
            });
        }
    },
};
