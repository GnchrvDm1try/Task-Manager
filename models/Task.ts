export default class Task {
    id: number;
    title: string;
    isDone: boolean;
    additionDate: Date;
    beginDate?: Date;
    deadlineDate?: Date;

    constructor(id: number, title: string, isDone: boolean, additionDate: Date, beginDate?: Date, deadlineDate?: Date) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
        this.additionDate = additionDate;
        this.beginDate = beginDate;
        this.deadlineDate = deadlineDate;
    }
}