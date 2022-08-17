import express from 'express';
import 'dotenv/config'
import {
    verifyKeyMiddleware,
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
import { SyncGuildCommands } from './commands/commands-sync.js';
import { ADD_COOKIE, TEST_COMMAND, VIEW_COOKIES } from './commands/command-defs.js';
import { runApplicationCommand } from './commands/cmd-runner.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY as string), async function (req, res) {
    // Interaction type and data
    const { type, id, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({type: InteractionResponseType.PONG});
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        console.log('poggers');
        let data = runApplicationCommand(req.body)
        res.send(data);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    SyncGuildCommands(process.env.APP_ID as string, process.env.GUILD_ID as string, [
        TEST_COMMAND,
        ADD_COOKIE,
        VIEW_COOKIES
    ]);
})