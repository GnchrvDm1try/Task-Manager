import Task from './Task';

export default class Stage {
    task: Task | undefined;
    id: number | undefined;
    taskId: number;
    title: string;
    isDone: boolean;
    description?: string;
    deadlineDate?: Date;

    constructor(taskId: number, title: string, isDone: boolean, description: string, deadlineDate: Date) {
        this.taskId = taskId;
        this.title = title;
        this.isDone = isDone;
        this.description = description;
        this.deadlineDate = deadlineDate;
    }
}