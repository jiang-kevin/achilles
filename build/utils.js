var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
export function DiscordRequest(endpoint, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // append endpoint to root API URL
        const url = 'https://discord.com/api/v10/' + endpoint;
        // Stringify payloads
        if (options.body)
            options.body = JSON.stringify(options.body);
        // Use node-fetch to make requests
        const res = yield fetch(url, Object.assign({ headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json; charset=UTF-8',
                'User-Agent': 'DiscordBot (https://github.com/jiang-kevin/achilles, 0.1.0)',
            } }, options));
        // throw API errors
        if (!res.ok) {
            const data = yield res.json();
            console.log(res.status);
            throw new Error(JSON.stringify(data));
        }
        // return original response
        return res;
    });
}
