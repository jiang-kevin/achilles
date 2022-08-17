import { DiscordRequest } from "../utils.js"

export async function SyncGuildCommands(appId: string, guildId: string, commands: Command[]) {
  if (guildId === '' || appId === '') {
    console.log("Please set GUILD_ID and APPLICATION_ID env variables");
    return;
  }

  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {

    const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands});
    const data = await res.json();
    
    console.log('Installed the following commands:')
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}