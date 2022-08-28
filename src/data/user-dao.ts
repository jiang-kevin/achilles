import { AchillesUser } from "./model/achilles-user.js"

export interface UserDao {
    selectCookieCountForUser(id: string): number
    updateCookieCountForUser(id: string, value: number): void
    selectUserById(id: string): AchillesUser | undefined
    insertUser(id: string): void
}