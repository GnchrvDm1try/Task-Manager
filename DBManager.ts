import * as SQLite from 'expo-sqlite';
import Task from './models/Task';
import Stage from './models/Stage';

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
    
    public getAllTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            DBManager.db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM Tasks`,
                    [],
                    (_, { rows }) => {
                        let tasks: Task[] = new Array<Task>();
                        for (let i = 0; i < rows.length; i++) {
                            let currentRow = rows.item(i)
                            let task = new Task(currentRow.id, currentRow.title, currentRow.is_done, currentRow.addition_date, currentRow.begin_date, currentRow.deadline_date);
                            tasks.push(task);
                        }
                        resolve(tasks);
                    },
                    (_, error) => { reject(error); return false; }
                );
            });
        });
    }

    public getStages(taskId: number): Promise<Stage[]> {
        return new Promise((resolve, reject) => {
            DBManager.db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM Stages WHERE task_id = ?`,
                    [taskId],
                    (_, { rows }) => {
                        let stages: Stage[] = new Array<Stage>();
                        for (let i = 0; i < rows.length; i++) {
                            let currentRow = rows.item(i)
                            stages.push(new Stage(currentRow.task_id, currentRow.title, currentRow.is_done, currentRow.description, currentRow.deadline_date));
                        }
                        resolve(stages);
                    },
                    (_, error) => { reject(error); return false; }
                );
            });
        });
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