import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

export type CommandData = SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

export interface CommandOptions {
  data: CommandData;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  category?: 'public' | 'admin';
}

export default class Command {
  data: CommandData;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  category: 'public' | 'admin';

  constructor(options: CommandOptions) {
    this.data = options.data;
    this.execute = options.execute;
    this.category = options.category ?? 'admin';
  }
}
