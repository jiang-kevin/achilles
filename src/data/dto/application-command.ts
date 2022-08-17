interface ApplicationCommand {
    id: string,
    name: string,
    type: number,
    guild_id: string,
    target_id: string,
    data: Command
}