import { DiscordRequest } from "./utils.js"

export async function SyncGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') {
    console.log("Please set GUILD_ID and APPLICATION_ID env variables");
    return;
  }

  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    console.log(commands);
    const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands});
    const data = await res.json();
    
    console.log('Installed the following commands:')
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Simple test command
export const TEST_COMMAND = {
    name: 'test',
    description: 'Basic guild command',
    type: 1,
};