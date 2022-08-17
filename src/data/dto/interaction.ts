import { InteractionType } from "discord-interactions";
import { GuildMember } from "./guild-member";
import { User } from "./user";

export interface Interaction {
    id: string,
    application_id: string,
    type: InteractionType,
    data: ApplicationCommand,
    guild_id: string,
    channel_id: string,
    member: GuildMember,
    user: User,
    token: string,
    version: number,
    message: any,
    app_permissions: string,
    locale: string,
    guild_locale: string
}