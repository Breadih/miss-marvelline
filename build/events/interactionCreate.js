"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        const command = interaction.client.commands?.get(interaction.commandName);
        if (!command) {
            console.error(`❌ No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`⚠️ Error executing ${interaction.commandName}`, error);
            const replyOptions = {
                content: 'There was an error while executing this command!',
                MessageFlags: discord_js_1.MessageFlags.Ephemeral,
            };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyOptions);
            }
            else {
                await interaction.reply(replyOptions);
            }
        }
    },
};
