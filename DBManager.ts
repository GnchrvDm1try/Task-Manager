import * as SQLite from 'expo-sqlite';
export class DBManager {
    private static instance: DBManager;
    private static readonly db = SQLite.openDatabase('TaskManagerDB')

    private constructor() {
        DBManager.createTasksTableIfNotExists();
        DBManager.createStagesTableIfNotExists();
    }

    public static getInstance(): DBManager {
        if (!DBManager.instance)
            DBManager.instance = new DBManager();
        return DBManager.instance;
    }

    private static createTasksTableIfNotExists() {
        DBManager.db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS Tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                is_done INTEGER CHECK(is_done IN(0, 1)) NOT NULL DEFAULT 0,
                addition_date TIMESTAMP NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                begin_date TIMESTAMP CHECK(begin_date > addition_date),
                deadline_date TIMESTAMP CHECK(deadline_date > begin_date ));`,
            );
        });
    }

    private static createStagesTableIfNotExists() {
        DBManager.db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS Stages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id INTEGER REFERENCES Tasks(id) NOT NULL,
                title TEXT NOT NULL,
                is_done INTEGER CHECK(is_done IN (0, 1)) NOT NULL DEFAULT 0,
                description TEXT,
                deadline_date TIMESTAMP);`
            );
        });
    }
}