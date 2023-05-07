import * as SQLite from 'expo-sqlite';
import Task from './models/Task';
import Stage from './models/Stage';

export class DBManager {
    private static instance: DBManager;
    private static readonly db = SQLite.openDatabase('TaskManagerDB');

    private constructor() {
        DBManager.createTasksTableIfNotExists();
        DBManager.createStagesTableIfNotExists();
    }

    public static getInstance(): DBManager {
        if (!DBManager.instance)
            DBManager.instance = new DBManager();
        return DBManager.instance;
    }

    public createTask(task: Task): Promise<number> {
        return new Promise((resolve, reject) => {
            DBManager.db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO Tasks (title, is_done, addition_date, begin_date, deadline_date) VALUES (?, ?, ?, ?, ?);`,
                    [task.title, task.isDone ? '1' : '0', task.additionDate.toISOString(), task.beginDate?.toISOString() ?? null, task.deadlineDate?.toISOString() ?? null],
                    (_, result) => { resolve(result.insertId!); },
                    (_, error) => { reject(error); return false; }
                );
            });
        });
    }

    public getAllTasksWithStages(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            DBManager.db.transaction(tx => {
                tx.executeSql(
                    `SELECT T.id, T.title, T.is_done, T.addition_date, T.begin_date, T.deadline_date, S.id AS stage_id, S.title AS stage_title, S.is_done AS stage_is_done, S.description AS stage_description, S.deadline_date AS stage_deadline_date FROM Tasks T
                    LEFT JOIN Stages S ON S.task_id = T.id`,
                    [],
                    (_, { rows }) => {
                        let tasks: Task[] = new Array<Task>();
                        for (let i = 0; i < rows.length; i++) {
                            const currentRow = rows.item(i);
                            if (!tasks.find(t => t.id === currentRow.id))
                                tasks.push(new Task({
                                    id: currentRow.id,
                                    title: currentRow.title,
                                    isDone: currentRow.is_done,
                                    additionDate: new Date(currentRow.addition_date),
                                    beginDate: currentRow.begin_date ? new Date(currentRow.begin_date) : undefined,
                                    deadlineDate: currentRow.deadline_date ? new Date(currentRow.deadline_date) : undefined
                                }));

                            if (currentRow.stage_id)
                                tasks.find(t => t.id === currentRow.id)!.stages.push(new Stage({
                                    id: currentRow.stage_id,
                                    taskId: currentRow.id,
                                    title: currentRow.stage_title,
                                    isDone: currentRow.stage_is_done,
                                    description: currentRow.stage_description,
                                    deadlineDate: currentRow.stage_deadline_date ? new Date(currentRow.stage_deadline_date) : undefined
                                }));
                        }
                        resolve(tasks);
                    },
                    (_, error) => { reject(error); return false; }
                );
            });
        });
    }

    public getTaskWithStages(id: number): Promise<Task | null> {
        return new Promise((resolve, reject) => {
            DBManager.db.transaction(tx => {
                tx.executeSql(
                    `SELECT T.id, T.title, T.is_done, T.addition_date, T.begin_date, T.deadline_date, S.id AS stage_id, S.title AS stage_title, S.is_done AS stage_is_done, S.description AS stage_description, S.deadline_date AS stage_deadline_date FROM Tasks T
                    LEFT JOIN Stages S ON S.task_id = T.id
                    WHERE T.id = ?`,
                    [id],
                    (_, { rows }) => {
                        let currentRow = rows.item(0);
                        if (currentRow) {
                            let task = new Task({
                                id: currentRow.id,
                                title: currentRow.title,
                                isDone: currentRow.is_done,
                                additionDate: new Date(currentRow.addition_date),
                                beginDate: currentRow.begin_date ? new Date(currentRow.begin_date) : undefined,
                                deadlineDate: currentRow.deadline_date ? new Date(currentRow.deadline_date) : undefined
                            });
                            for (let i = 0; i < rows.length; i++) {
                                currentRow = rows.item(i);
                                if (currentRow.stage_id)
                                    task.stages.push(new Stage({
                                        id: currentRow.stage_id,
                                        taskId: currentRow.id,
                                        title: currentRow.stage_title,
                                        isDone: currentRow.stage_is_done,
                                        description: currentRow.stage_description,
                                        deadlineDate: currentRow.stage_deadline_date ? new Date(currentRow.stage_deadline_date) : undefined
                                    }));
                            }
                            resolve(task);
                        }
                        resolve(null);
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
                            stages.push(new Stage({
                                id: currentRow.stage_id,
                                taskId: currentRow.task_id,
                                title: currentRow.title,
                                isDone: currentRow.is_done,
                                description: currentRow.description,
                                deadlineDate: currentRow.stage_deadline_date ? new Date(currentRow.stage_deadline_date) : undefined
                            }));
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
                begin_date TIMESTAMP,
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