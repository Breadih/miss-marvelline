"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _newCommand_1 = __importDefault(require("#newCommand"));
const discord_js_1 = require("discord.js");
const package_json_1 = __importDefault(require("../../../package.json"));
const _colours_1 = require("#colours");
const os_1 = __importDefault(require("os"));
const Facts = [
    "I'm totally written in TypeScript, then compiled to JavaScript! UwU",
    'May seem funny, but Bread actually started coding once he thought of the name "Miss Marvelline" LOL.',
    "I'm not on stable versions—I'm daily updated with new features!",
    "By 2023, Discord had more than 140 million active monthly users and an estimated average of 26.5 million users per day!",
    "I was born to make your server smarter, sassier, and better managed 💅.",
    "My developers give me new powers every other day. I'm basically a coding lab rat—but cute.",
];
function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function formatPlatform(platform) {
    switch (platform) {
        case "win32": return "Windows";
        case "linux": return "Linux";
        case "darwin": return "macOS";
        default: return platform;
    }
}
exports.default = new _newCommand_1.default({
    data: new discord_js_1.SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("See information about me!"),
    async execute(interaction) {
        const client = interaction.client;
        const heapUsedMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        const rssMB = Math.round(process.memoryUsage().rss / 1024 / 1024);
        const totalMemoryMB = Math.round(os_1.default.totalmem() / 1024 / 1024);
        const cpuModel = os_1.default.cpus()[0].model;
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0);
        const IntroductionEmbed = new discord_js_1.EmbedBuilder()
            .setColor(_colours_1.colors.MainColour)
            .setTitle("🤖 Miss Marvelline - Bot Info")
            .setDescription("Hiya! I'm a public Discord Bot designed to help manage and enhance your guild!")
            .addFields({ name: "Discord Bot Name", value: client.user.username, inline: true }, { name: "Discord.js Version", value: package_json_1.default.dependencies["discord.js"], inline: true }, { name: "Version", value: package_json_1.default.version, inline: true }, {
            name: "Developers",
            value: `[bread x](https://discord.com/users/901562525294927932)\n` +
                `[kokogamerpl](https://discord.com/users/1007651973404835954)\n` +
                `[fusionvr](https://discord.com/users/931938914959228948)\n` +
                `[olliebobsg](https://discord.com/users/739472626312806461)`,
            inline: true,
        }, { name: "Uptime", value: formatUptime(client.uptime ?? 0), inline: true }, { name: "Process Uptime", value: formatUptime(process.uptime() * 1000), inline: true }, { name: "System Uptime", value: formatUptime(os_1.default.uptime() * 1000), inline: true }, { name: "Guilds", value: `${client.guilds.cache.size}`, inline: true }, { name: "Total User Reach", value: `${totalUsers}`, inline: true }, { name: "Bot Created", value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: true }, { name: "Hosting Platform", value: formatPlatform(process.platform), inline: true }, { name: "CPU", value: cpuModel, inline: true }, { name: "Total System Memory", value: `${totalMemoryMB} MB`, inline: true }, { name: "Memory Usage", value: `${heapUsedMB} MB heap / ${rssMB} MB rss`, inline: true }, { name: "Node.js Version", value: process.version, inline: true }, { name: "API Latency", value: `${client.ws.ping}ms`, inline: true }, { name: "Environment", value: process.env.NODE_ENV || "development", inline: true }, { name: "Total Commands", value: `${interaction.client?.commands.size ?? "?"}`, inline: true }, {
            name: "Shard",
            value: client.shard
                ? `${client.shard.ids[0] + 1} / ${client.shard.count}`
                : "1 / 1",
            inline: true,
        }, { name: "Fun Fact", value: Facts[Math.floor(Math.random() * Facts.length)] })
            .setFooter({ text: "Thanks for using Miss Marvelline 🤍" });
        const buttons = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setLabel("Invite Me")
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setURL("https://discord.com/oauth2/authorize?client_id=1368848711576322048"), new discord_js_1.ButtonBuilder()
            .setLabel("Support Server")
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setURL("https://discord.gg/DC8aFnAxuU"));
        await interaction.reply({
            embeds: [IntroductionEmbed],
            components: [buttons],
        });
    },
});
