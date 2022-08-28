import { User } from "./dto/user";
import { UserDao } from "./user-dao";

export class UserRepository {

    private readonly userDao: UserDao
    
    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    addCookie(user: User): void {
        if (!this.checkUserExists(user)) {
            this.addUser(user);
        }

        let id = user.id;
        let count = this.userDao.selectCookieCountForUser(id);
        this.userDao.updateCookieCountForUser(id, count + 1);
    }

    getCookieCount(user: User): number {
        return this.userDao.selectCookieCountForUser(user.id);
    }

    private checkUserExists(user: User): boolean {
        let result = this.userDao.selectUserById(user.id);

        return (result != null) && (result != undefined);
    }

    private addUser(user: User): void {
        this.userDao.insertUser(user.id);
    }
}