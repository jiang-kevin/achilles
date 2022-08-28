import Database from "better-sqlite3";

const DB_NAME = "achilles_db.sqlite";
const USER_TABLE_SCHEMA = `
CREATE TABLE IF NOT EXISTS USERS (
    id TEXT PRIMARY KEY,
    cookies INTEGER NOT NULL
);
`

function fetchConnection() {
    let db = new Database(DB_NAME, { verbose: console.log });
    let create = db.prepare(USER_TABLE_SCHEMA);
    const info = create.run();

    console.log(info);

    return db;
}

export {fetchConnection};