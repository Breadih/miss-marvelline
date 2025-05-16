import Command from "#newCommand";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Package from "../../../package.json";
import { colors } from "#colours";

const Facts = [
  "I'm totally written in TypeScript, then compiled to JavaScript! UwU",
  'May seem funny, but Bread actually started coding once he thought of the name "Miss Marvelline" LOL.',
  "I'm not on stable versions—I'm daily updated with new features!",
  "By 2023, Discord had more than 140 million active monthly users and an estimated average of 26.5 million users per day!",
  "I was born to make your server smarter, sassier, and better managed 💅.",
  "My developers give me new powers every other day. I'm basically a coding lab rat—but cute.",
];

function formatUptime(ms: number) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription("See information about me!"),
  async execute(interaction) {
    const client = interaction.client;

    const IntroductionEmbed = new EmbedBuilder()
      .setColor(colors.MainColour)
      .setTitle("🤖 Miss Marvelline - Bot Info")
      .setDescription("Hiya! I'm a public Discord Bot designed to help manage and enhance your guild!")
      .addFields(
        { name: "Discord Bot Name", value: client.user.username, inline: true },
        { name: "Discord.js Version", value: Package.dependencies["discord.js"], inline: true },
        { name: "Version", value: Package.version, inline: true },
        {
          name: "Developers",
          value:
            `[bread x](https://discord.com/users/901562525294927932)\n` +
            `[kokogamerpl](https://discord.com/users/1007651973404835954)\n` +
            `[fusionvr](https://discord.com/users/931938914959228948)\n` +
            `[olliebobsg](https://discord.com/users/739472626312806461)`,
          inline: true,
        },
        { name: "Uptime", value: formatUptime(client.uptime ?? 0), inline: true },
        { name: "Guilds", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Users", value: `${client.users.cache.size}`, inline: true },
        { name: "Bot Created", value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: true },
        { name: "Fun Fact", value: Facts[Math.floor(Math.random() * Facts.length)] }
      )
      .setFooter({ text: "Thanks for using Miss Marvelline 🤍" });

    await interaction.reply({
      embeds: [IntroductionEmbed],
    });
  },
});
