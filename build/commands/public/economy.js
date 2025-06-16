"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _newCommand_1 = __importDefault(require("#newCommand"));
const _colours_1 = require("#colours");
const discord_js_2 = require("discord.js");
const economy_1 = __importDefault(require("../../schema/economy"));
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName("economy")
        .setDescription("Economy related commands.")
        .addSubcommand((subcommand) => subcommand
        .setName("balance")
        .setDescription("Check your or another user's balance.")
        .addUserOption((option) => option
        .setName("user")
        .setDescription("The user to check the balance of.")
        .setRequired(false)))
        .addSubcommand((subcommand) => subcommand
        .setName("create")
        .setDescription("Create an economy for your server.")),
    async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.guild) {
            await interaction.editReply("This command can only be used in a server.");
            return;
        }
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "create": {
                if (interaction.guild.ownerId != interaction.user.id) {
                    await interaction.editReply("Only the server owner can create an economy.");
                    return;
                }
                try {
                    const existingEconomy = await economy_1.default.findOne({ GuildID: interaction.guild.id });
                    if (existingEconomy) {
                        await interaction.editReply({
                            embeds: [new discord_js_1.EmbedBuilder().setColor(discord_js_1.Colors.Red).setDescription("An economy already exists for this server.")],
                        });
                        return;
                    }
                }
                catch {
                    await interaction.editReply({
                        embeds: [new discord_js_1.EmbedBuilder().setColor(discord_js_1.Colors.Red).setDescription("An error occurred while checking the economy.")],
                    });
                    return;
                }
                const embedIntroduction = new discord_js_1.EmbedBuilder()
                    .setDescription(`Hey! Welcome to the economy system! In this system, you'll be held responsible to make your economy work and be the best. The rules are simple:\n* Current Rate: \n  * Each person that starts the economy, will have a rate of 0.5, being **1 the highest, therefore the best** currency, and **0, the worst economy**. Your server members must work in order to make the server economy the best.\n * Compare your Guild Coin to others: \n  * In the meanwhile you build your empire in your server, you might wanna take a look in comparing economies (so then you can flex to your friends :3) about how good your economy is, or not :p. `)
                    .setColor(_colours_1.colors.MainColour);
                const button = new discord_js_1.ButtonBuilder()
                    .setCustomId("economy_create:" + interaction.guild.id)
                    .setLabel("Create Economy")
                    .setStyle(discord_js_2.ButtonStyle.Primary);
                const ActionRow = new discord_js_1.ActionRowBuilder().addComponents(button);
                await interaction.editReply({
                    embeds: [embedIntroduction],
                    components: [ActionRow.toJSON()],
                });
                break;
            }
        }
    },
});
