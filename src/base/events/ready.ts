import chalk from 'chalk';
import log from 'consola';
import { ActivityType, Client, Events } from 'discord.js';
import mongoose from 'mongoose';

export default {
  name: Events.ClientReady,
  once: true, // Run only once when the bot is ready
  async execute(client: Client): Promise<void> {
    if (!client.user) {
      log.error("Client user is undefined.");
      return;
    }

    log.success(chalk.green(`✅ Logged in as ${client.user.tag}`));

    await mongoose.connect('mongodb+srv://user:PhAoFYoeUJpqmG1h@miss-marvelline-cluster.zdoxosu.mongodb.net/?retryWrites=true&w=majority&appName=Miss-Marvelline-Cluster').then((client) => log.success(`Successfully connected to ${client.connection.db?.databaseName}`))

    const updateStatus = () => {
      client.user?.setActivity({
        name: `${client.guilds.cache.size} servers`,
        type: ActivityType.Watching,
      });
    };

    // Run immediately on startup
    updateStatus();

    // Update every 60 seconds (safe with rate limits)
    setInterval(updateStatus, 60 * 1000);
  },
};
