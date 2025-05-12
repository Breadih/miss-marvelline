import fs from "node:fs";
import path from "node:path";
import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { pathToFileURL } from "url";
import log from "consola";

export default async function loadCommands() {
  const publicCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  const adminCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  const commandsPath = path.join(__dirname, "..", "..", "commands", "public");
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of commandFiles) {
    const compiledFilePath = path.join(commandsPath, file);

    try {
      // Use require to load compiled JS files
      const commandModule = await require(compiledFilePath); // Using require for JS compatibility
      const command = commandModule.default || commandModule;

      if (!command.data) {
        console.error(`Command ${file} has no 'data' property.`);
        continue; // Skip this command if 'data' is missing
      }

      console.log(`Command ${file} data:`, command.data); // Log the command data for debugging

      const json = command.data.toJSON();

      // Categorize based on the `category` property
      if (command.category === "admin") {
        adminCommands.push(json);
      } else {
        publicCommands.push(json);
      }
    } catch (error) {
      console.error(`Error loading command from ${compiledFilePath}:`, error);
    }
  }

  const rest = new REST({ version: "10" }).setToken(process.env.Token!);

  try {
    console.log("🔁 Refreshing application (/) commands...");

    await rest.put(Routes.applicationCommands(process.env.ClientID!), {
      body: publicCommands,
    });

    await rest.put(
      Routes.applicationGuildCommands(process.env.ClientID!, process.env.MainGuild!),
      {
        body: adminCommands,
      }
    );

    console.log("✅ Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("❌ Failed to reload commands:", error);
  }
}
