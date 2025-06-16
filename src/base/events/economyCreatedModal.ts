import {
  Events,
  Interaction,
  EmbedBuilder,
  Colors,
  MessageFlags,
} from "discord.js";
import economy from "../../schema/economy";

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId.startsWith("economy_setup_modal:")) return;

    const guildId = interaction.customId.split(":")[1];

    const coinName = interaction.fields.getTextInputValue("coinName");

    try {
      const existingEconomy = await economy.findOne({ GuildID: guildId });
      if (existingEconomy) {
        await interaction.reply({
          content:
            "Don't be silly, an economy already exists for this server. >~<",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      // Validate the coin name
      if (!coinName || coinName.length < 3 || coinName.length > 20) {
        await interaction.reply({
          content: "Coin name must be between 3 and 20 characters long.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      const econmy = new economy({
        GuildID: guildId,
        coinName: coinName,
        cRate: 0.5,
      });

      const newBalance = {
        userId: interaction.user.id,
        balance: 500,
        position: "Not ranked",
      };

      econmy.balance.push(newBalance);
      await econmy.save(); // Save the new balance

    } catch (error) {
      console.error("Error processing economy setup modal:", error);
      await interaction.reply({
        content: "An error occurred while processing your request.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // Here you would typically handle the economy creation logic, e.g., saving to a database
    // For demonstration, we will just log the coin name and guild ID
    console.log(
      `Creating economy for guild ${guildId} with coin name: ${coinName}`
    );

    const successEmbed = new EmbedBuilder()
      .setDescription(
        `**${coinName}** has been created successfully! Time to go all the way up! I've also gave you 500 *${coinName}* .Wishing you luck. :3`
      )
      .setColor(Colors.Green)
      .setTitle("Yippieeeee!!!");

    await interaction.reply({
      embeds: [successEmbed],
    });
  },
};
