import {} from '../../schema/setup'
import { Events, Interaction } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  once: true, // Run only once when the bot is ready
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('economy_create')) return;

    const guildId = interaction.customId.split(':')[1];
  },
};
