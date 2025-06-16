"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName("minecraft")
        .setDescription("Commands related to Minecraft.")
        .addSubcommand((command) => command
        .setName("lookup")
        .setDescription("Lookup someone's Minecraft profile")
        .addStringOption((option) => option.setName("username").setDescription("Minecraft username").setRequired(true))),
    async execute(interaction) {
        await interaction.deferReply();
        const subcommand = interaction.options.getSubcommand();
        if (subcommand !== "lookup")
            return;
        const username = interaction.options.getString("username", true);
        try {
            const { data: minecraftData } = await axios_1.default.get(`https://api.minecraftservices.com/minecraft/profile/lookup/name/${username}`);
            const profileSection = new discord_js_1.SectionBuilder({
                components: [
                    {
                        type: discord_js_1.ComponentType.TextDisplay,
                        content: `## ${minecraftData.name}'s Minecraft Info`
                    }
                ],
                accessory: {
                    type: discord_js_1.ComponentType.Thumbnail,
                    media: {
                        url: `https://starlightskins.lunareclipse.studio/render/head/${minecraftData.name}/full`
                    }
                }
            });
            const separator = new discord_js_1.SeparatorBuilder({
                spacing: discord_js_1.SeparatorSpacingSize.Large
            });
            const detailsText = new discord_js_1.TextDisplayBuilder({
                content: `**Name**: \`${minecraftData.name}\`\n**Id**: \`${minecraftData.id}\``,
            });
            const container = new discord_js_1.ContainerBuilder({
                accent_color: discord_js_1.Colors.Green,
            });
            container.addSectionComponents(profileSection);
            container.addSeparatorComponents(separator);
            container.addTextDisplayComponents(detailsText);
            await interaction.editReply({
                flags: discord_js_1.MessageFlags.IsComponentsV2,
                components: [container]
            });
        }
        catch (err) {
            const errorContainer = new discord_js_1.ContainerBuilder({
                accent_color: discord_js_1.Colors.Red
            });
            const errorSection = new discord_js_1.SectionBuilder({
                components: [
                    {
                        type: discord_js_1.ComponentType.TextDisplay,
                        content: `## ❌ Failed to fetch info for \`${username}\`\nPlease try again later.`
                    }
                ]
            });
            errorContainer.addSectionComponents([errorSection]);
            await interaction.editReply({
                flags: discord_js_1.MessageFlags.IsComponentsV2,
                components: [errorContainer]
            });
        }
    }
});
