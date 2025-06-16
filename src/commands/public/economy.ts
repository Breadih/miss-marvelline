import {
  ActionRowBuilder,
  ButtonBuilder,
  Colors,
  Embed,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import Command from "#newCommand";
import { colors } from "#colours";
import { ButtonStyle } from "discord.js";
import economyDB from "../../schema/economy";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("economy")
    .setDescription("Economy related commands.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("balance")
        .setDescription("Check your or another user's balance.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to check the balance of.")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create an economy for your server.")
    ),

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
          await interaction.editReply(
            "Only the server owner can create an economy."
          );
          return;
        }

        try {
          const existingEconomy = await economyDB.findOne({ GuildID: interaction.guild.id});
          if (existingEconomy) {
            await interaction.editReply({
              embeds: [new EmbedBuilder().setColor(Colors.Red).setDescription("An economy already exists for this server.")],
            });
            return;
          }
        } catch {
          await interaction.editReply({
            embeds: [new EmbedBuilder().setColor(Colors.Red).setDescription("An error occurred while checking the economy.")],
          });
          return;
        }

        const embedIntroduction = new EmbedBuilder()
          .setDescription(
            `Hey! Welcome to the economy system! In this system, you'll be held responsible to make your economy work and be the best. The rules are simple:\n* Current Rate: \n  * Each person that starts the economy, will have a rate of 0.5, being **1 the highest, therefore the best** currency, and **0, the worst economy**. Your server members must work in order to make the server economy the best.\n * Compare your Guild Coin to others: \n  * In the meanwhile you build your empire in your server, you might wanna take a look in comparing economies (so then you can flex to your friends :3) about how good your economy is, or not :p. `
          )
          .setColor(colors.MainColour);
        const button = new ButtonBuilder()
          .setCustomId("economy_create:" + interaction.guild.id)
          .setLabel("Create Economy")
          .setStyle(ButtonStyle.Primary);

        const ActionRow = new ActionRowBuilder().addComponents(button);
        await interaction.editReply({
          embeds: [embedIntroduction],
          components: [ActionRow.toJSON()],
        });

        break;
      }
    }
  },
});
