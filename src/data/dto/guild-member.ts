import { User } from "./user.js";

export interface GuildMember {
    user: User,
    nick: string,
    avatar: string,
    roles: string[],
    joined_at: string,
    premium_since: string,
    deaf: boolean,
    mute: boolean,
    pending: boolean,
    permissions: string,
    communication_disabled_until: string
}