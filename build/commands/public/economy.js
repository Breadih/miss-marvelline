"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _newCommand_1 = __importDefault(require("#newCommand"));
const _colours_1 = require("#colours");
const economy_1 = __importDefault(require("../../schema/economy"));
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName("economy")
        .setDescription("Economy related commands.")
        .addSubcommand((sub) => sub
        .setName("balance")
        .setDescription("Check your or another user's balance.")
        .addUserOption((option) => option
        .setName("user")
        .setDescription("The user to check the balance of.")
        .setRequired(false)))
        .addSubcommand((sub) => sub.setName("create").setDescription("Create an economy for your server."))
        .addSubcommand((sub) => sub
        .setName("donate")
        .setDescription("Donate coins to another user.")
        .addUserOption((option) => option
        .setName("target")
        .setDescription("User to donate to.")
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("value")
        .setDescription("Amount to donate.")
        .setRequired(true))),
    async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.guild) {
            await interaction.editReply("This command can only be used in a server.");
            return;
        }
        const sub = interaction.options.getSubcommand();
        const guildId = interaction.guild.id;
        const user = interaction.user;
        switch (sub) {
            case "create": {
                if (interaction.guild.ownerId !== user.id) {
                    await interaction.editReply("Only the server owner can create an economy.");
                    return;
                }
                try {
                    const exists = await economy_1.default.findOne({ GuildID: guildId });
                    if (exists) {
                        await interaction.editReply({
                            embeds: [
                                new discord_js_1.EmbedBuilder()
                                    .setColor(discord_js_1.Colors.Red)
                                    .setDescription("An economy already exists for this server."),
                            ],
                        });
                        return;
                    }
                    const embed = new discord_js_1.EmbedBuilder()
                        .setColor(_colours_1.colors.MainColour)
                        .setDescription(`Hey! Welcome to the economy system!\n\n📈 **Rate System**: Your economy starts with a rate of 0.5 (1 = best, 0 = worst).\n👑 **Goal**: Build your economy and compete with other servers.\n\nClick the button below to begin.`);
                    const button = new discord_js_1.ButtonBuilder()
                        .setCustomId(`economy_create:${guildId}`)
                        .setLabel("Create Economy")
                        .setStyle(discord_js_1.ButtonStyle.Primary);
                    const row = new discord_js_1.ActionRowBuilder().addComponents(button);
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
                catch (err) {
                    console.error("Create economy error:", err);
                    await interaction.editReply({
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setColor(discord_js_1.Colors.Red)
                                .setDescription("An error occurred while creating the economy."),
                        ],
                    });
                }
                break;
            }
            case "balance": {
                const target = interaction.options.getUser("user") || user;
                try {
                    const data = await economy_1.default.findOne({ GuildID: guildId });
                    if (!data) {
                        await interaction.editReply({
                            embeds: [
                                new discord_js_1.EmbedBuilder()
                                    .setColor(discord_js_1.Colors.Red)
                                    .setDescription("No economy found for this server."),
                            ],
                        });
                        return;
                    }
                    let entry = data.balance.find(b => b.userId === target.id);
                    if (!entry) {
                        entry = { userId: target.id, balance: 0, position: "Not ranked" };
                        data.balance.push(entry);
                        await data.save();
                    }
                    const embed = new discord_js_1.EmbedBuilder()
                        .setColor(_colours_1.colors.MainColour)
                        .setTitle(`${target.username}'s Balance`)
                        .setThumbnail(target.displayAvatarURL({ size: 512 }))
                        .addFields({
                        name: "Balance",
                        value: `${entry.balance} ${data.coinName || "Coins"}`,
                        inline: true,
                    }, {
                        name: "Position",
                        value: entry.position || "Not ranked",
                        inline: true,
                    });
                    await interaction.editReply({ embeds: [embed] });
                }
                catch (err) {
                    console.error("Balance error:", err);
                    await interaction.editReply({
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setColor(discord_js_1.Colors.Red)
                                .setDescription("An error occurred while fetching the balance."),
                        ],
                    });
                }
                break;
            }
            case "donate": {
                const target = interaction.options.getUser("target", true);
                const amount = interaction.options.getInteger("value", true);
                if (target.id === user.id) {
                    await interaction.editReply("You can't donate to yourself.");
                    return;
                }
                if (target.bot) {
                    await interaction.editReply("You can't donate to bots.");
                    return;
                }
                try {
                    const data = await economy_1.default.findOne({ GuildID: guildId });
                    if (!data) {
                        await interaction.editReply({
                            embeds: [
                                new discord_js_1.EmbedBuilder()
                                    .setColor(discord_js_1.Colors.Red)
                                    .setDescription("No economy found for this server."),
                            ],
                        });
                        return;
                    }
                    const sender = data.balance.find(b => b.userId === user.id);
                    if (!sender || sender.balance < amount) {
                        await interaction.editReply({
                            embeds: [
                                new discord_js_1.EmbedBuilder()
                                    .setColor(discord_js_1.Colors.Yellow)
                                    .setDescription("You don't have enough balance to donate."),
                            ],
                        });
                        return;
                    }
                    let recipient = data.balance.find(b => b.userId === target.id);
                    if (!recipient) {
                        recipient = { userId: target.id, balance: amount, position: "Not ranked" };
                        data.balance.push(recipient);
                    }
                    else {
                        recipient.balance += amount;
                    }
                    sender.balance -= amount;
                    await data.save();
                    try {
                        const dmEmbed = new discord_js_1.EmbedBuilder()
                            .setColor(discord_js_1.Colors.Green)
                            .setDescription(`🎁 ${user.globalName || user.username} has donated **${amount} ${data.coinName || "Coins"}** to you!`);
                        await target.send({ embeds: [dmEmbed] });
                    }
                    catch {
                        console.warn(`Failed to DM ${target.tag}`);
                    }
                    const confirmEmbed = new discord_js_1.EmbedBuilder()
                        .setColor(discord_js_1.Colors.Green)
                        .setDescription(`You successfully donated **${amount} ${data.coinName || "Coins"}** to ${target.globalName || target.username}.`);
                    await interaction.editReply({ embeds: [confirmEmbed] });
                }
                catch (err) {
                    console.error("Donate error:", err);
                    await interaction.editReply("An error occurred while processing your donation.");
                }
                break;
            }
        }
    },
});
