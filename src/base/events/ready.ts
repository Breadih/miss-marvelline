import chalk from 'chalk';
import log from 'consola';
import { ActivityType, Client, Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true, // Run only once when the bot is ready
  async execute(client: Client): Promise<void> {
    if (!client.user) {
      log.error("Client user is undefined.");
      return;
    }

    log.success(chalk.green(`✅ Logged in as ${client.user.tag}`));

    // Set activity status
    client.user.setActivity({
      name: `${client.guilds.cache.size} servers`,
      type: ActivityType.Watching,
    });
  },
};
