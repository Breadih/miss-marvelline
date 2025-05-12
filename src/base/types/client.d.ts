// src/types/client.d.ts
import { Client, Collection } from 'discord.js';
import type { Command } from '#newCommand'; // Adjust this import if needed

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
