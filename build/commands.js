var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DiscordRequest } from "./utils.js";
export function SyncGuildCommands(appId, guildId, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        if (guildId === '' || appId === '') {
            console.log("Please set GUILD_ID and APPLICATION_ID env variables");
            return;
        }
        const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
        try {
            const res = yield DiscordRequest(endpoint, { method: 'PUT', body: commands });
            const data = yield res.json();
            console.log('Installed the following commands:');
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    });
}
// Simple test command
export const TEST_COMMAND = {
    name: 'test',
    description: 'Basic guild command 1',
    type: 1,
};
