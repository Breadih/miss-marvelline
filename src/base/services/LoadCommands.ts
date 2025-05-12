// src/base/services/loadCommands.ts
import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import path from 'node:path';
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import Command from '#newCommand'; // Your Command wrapper class

export default async function loadCommands() {
  const publicCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  const adminCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  const folders = ['public', 'admin'];

  for (const folder of folders) {
    const commandsPath = path.join(__dirname, '..', '..', 'commands', folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const commandModule = await import(pathToFileURL(filePath).href);
      const command: Command = commandModule.default;

      // Debugging output: Check if 'command.data' exists
      console.log(`Checking command: ${file}`);
      if (!command.data) {
        console.error(`Command ${file} has no 'data' property`);
        continue; // Skip this command if 'data' is missing
      }

      console.log(`Command ${file} data:`, command.data);  // Log the command data for debugging

      const json = command.data.toJSON();

      if (command.category === 'public') {
        publicCommands.push(json);
      } else {
        adminCommands.push(json);
      }
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.Token!);

  try {
    console.log('🔁 Refreshing application (/) commands...');

    await rest.put(Routes.applicationCommands(process.env.ClientID!), {
      body: publicCommands,
    });

    await rest.put(
      Routes.applicationGuildCommands(process.env.ClientID!, process.env.MainGuild!),
      {
        body: adminCommands,
      }
    );

    console.log('✅ Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('❌ Failed to reload commands:', error);
  }
}
