import { InteractionResponseType } from "discord-interactions";
import { Interaction } from "../data/dto/interaction.js";
import { ADD_COOKIE, TEST_COMMAND } from "./command-defs.js";

function runApplicationCommand(cmd: Interaction) {
    switch(cmd.data.name) {
        case TEST_COMMAND.name:
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Hello world!'
                }
            };

        case ADD_COOKIE.name:
            console.log("Add cookie called by: ");
            console.log(cmd.member.user.username + cmd.member.user.discriminator);
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Cookies'
                }
            };

    }
}

export {runApplicationCommand}