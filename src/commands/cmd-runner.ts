import { InteractionResponseType } from "discord-interactions";
import { Interaction } from "../data/dto/interaction.js";
import { User } from "../data/dto/user.js";
import { SQLiteUserDao } from "../data/sqlite-user-dao.js";
import { UserRepository } from "../data/user-repository.js";
import { ADD_COOKIE, TEST_COMMAND, VIEW_COOKIES } from "./command-defs.js";

var userDao = new SQLiteUserDao();
var userRepository = new UserRepository(userDao);

function runApplicationCommand(cmd: Interaction) {
    let user: User = cmd.member.user;
    switch(cmd.data.name) {
        case TEST_COMMAND.name:
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Hello world!'
                }
            };

        case ADD_COOKIE.name:
            console.log("Add cookie called by: " + user.username);
            userRepository.addCookie(user);
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Added a cookie'
                }
            };

        case VIEW_COOKIES.name:
            let count = userRepository.getCookieCount(user);
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: count
                }
            };


    }
}

export {runApplicationCommand}