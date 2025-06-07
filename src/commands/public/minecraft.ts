import Command from "#newCommand";
import {
  Colors,
  ComponentType,
  ContainerBuilder,
  MessageFlags,
  SectionBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  SlashCommandBuilder,
  TextDisplayBuilder,
  codeBlock
} from "discord.js";
import axios from "axios";

interface MinecraftUser {
  name: string;
  id: string;
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("Commands related to Minecraft.")
    .addSubcommand((command) =>
      command
        .setName("lookup")
        .setDescription("Lookup someone's Minecraft profile")
        .addStringOption((option) =>
          option.setName("username").setDescription("Minecraft username").setRequired(true)
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand !== "lookup") return;

    const username = interaction.options.getString("username", true);

    try {
      const { data: minecraftData } = await axios.get<MinecraftUser>(
        `https://api.minecraftservices.com/minecraft/profile/lookup/name/${username}`
      );

      const profileSection = new SectionBuilder({
        components: [
          {
            type: ComponentType.TextDisplay,
            content: `## ${minecraftData.name}'s Minecraft Info`
          }
        ],
        accessory: {
          type: ComponentType.Thumbnail,
          media: {
            url: `https://starlightskins.lunareclipse.studio/render/head/${minecraftData.name}/full`
          }
        }
      });

      const separator = new SeparatorBuilder({
        spacing: SeparatorSpacingSize.Large
      });

      const detailsText = new TextDisplayBuilder({
        content: `**Name**: \`${minecraftData.name}\`\n**Id**: \`${minecraftData.id}\``,
      });

      const container = new ContainerBuilder({
        accent_color: Colors.Green,
      });

      container.addSectionComponents(profileSection);
      container.addSeparatorComponents(separator)
      container.addTextDisplayComponents(detailsText)

      await interaction.editReply({
        flags: MessageFlags.IsComponentsV2,
        components: [container]
      });

    } catch (err) {
      const errorContainer = new ContainerBuilder({
        accent_color: Colors.Red
      });

      const errorSection = new SectionBuilder({
        components: [
          {
            type: ComponentType.TextDisplay,
            content: `## ❌ Failed to fetch info for \`${username}\`\nPlease try again later.`
          }
        ]
      });

      errorContainer.addSectionComponents([errorSection]);

      await interaction.editReply({
        flags: MessageFlags.IsComponentsV2,
        components: [errorContainer]
      });
    }
  }
});
