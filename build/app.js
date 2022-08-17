var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import 'dotenv/config';
import { verifyKeyMiddleware, InteractionType, InteractionResponseType, } from 'discord-interactions';
import { SyncGuildCommands, TEST_COMMAND } from './commands.js';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Interaction type and data
        const { type, id, data } = req.body;
        if (type === InteractionType.PING) {
            return res.send({ type: InteractionResponseType.PONG });
        }
        if (type === InteractionType.APPLICATION_COMMAND) {
            const { name } = data;
            if (name === 'test') {
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'Hello world!'
                    }
                });
            }
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    SyncGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
        TEST_COMMAND
    ]);
});
