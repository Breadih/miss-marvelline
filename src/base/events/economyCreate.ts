import {
  Events,
  Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith("economy_create")) return;

    const guildId = interaction.customId.split(":")[1];

    const coinName = new TextInputBuilder()
      .setCustomId("coinName")
      .setLabel("Coin Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(coinName);

    const modal = new ModalBuilder()
      .setCustomId(`economy_setup_modal:${guildId}`)
      .setTitle("Setup Economy")
      .addComponents(actionRow);

    try {
      await interaction.showModal(modal);
    } catch (error) {
      console.error("Error handling economy create interaction:", error);
      await interaction.reply({
        content: "An error occurred while processing your request.",
        ephemeral: true,
      });
    }
  },
};
