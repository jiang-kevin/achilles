import { Database } from "better-sqlite3";
import { fetchConnection } from "./database.js";
import { AchillesUser } from "./model/achilles-user.js";
import { UserDao } from "./user-dao.js";

export class SQLiteUserDao implements UserDao {
    private db: Database;

    private SELECT_COOKIES_SQL = "SELECT cookies FROM USERS WHERE id = ?";
    private UPDATE_COOKIES_SQL = "UPDATE USERS SET cookies = ? WHERE id = ?";
    private SELECT_USER_SQL = "SELECT * FROM USERS WHERE id = ?";
    private INSERT_USER_SQL = "INSERT INTO USERS VALUES (?, ?)";

    constructor() {
        this.db = fetchConnection();
    }

    selectCookieCountForUser(id: string): number {
        const select = this.db.prepare(this.SELECT_COOKIES_SQL);
        let result = select.get(id);
        return result['cookies'];
    }

    updateCookieCountForUser(id: string, value: number): void {
        const update = this.db.prepare(this.UPDATE_COOKIES_SQL);
        update.run(value, id);
    }

    selectUserById(id: string): AchillesUser | undefined {
        const select = this.db.prepare(this.SELECT_USER_SQL);
        let result = select.get(id);
        let user;

        if (result) {
            user = this.mapResultToAchillesUser(result);
        }

        return user;
    }

    insertUser(id: string): void {
        const insert = this.db.prepare(this.INSERT_USER_SQL);
        insert.run(id, 0);
    }

    private mapResultToAchillesUser(result: any): AchillesUser {
        console.log(result);
        let user = new AchillesUser();
        user.id = result['id'];
        user.cookieCount = result['cookies'];

        return user;
    }
}