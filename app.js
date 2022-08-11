import express from 'express';
import {
    verifyKeyMiddleware,
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';
import { HasGuildCommands, TEST_COMMAND } from './commands.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction type and data
    const { type, id, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({type: InteractionResponseType.PONG});
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
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
        TEST_COMMAND
    ]);
})