import chalk from 'chalk';
import log from 'consola';
import { Client, Events, Interaction, MessageFlags } from 'discord.js';

export default {
  name: Events.ClientReady,
  async execute(client: Client) {
    if (client.user) {
        log.success(chalk.green(`Logged in as ${client.user.tag}`))
    }
  },
};
