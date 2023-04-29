import Stage from './Stage'

// isDone accepts a boolean or number, where 0 is false, and any other number - true
interface ITaskProps {
    title: string;
    id?: number;
    isDone?: boolean | number;
    additionDate?: Date;
    beginDate?: Date;
    deadlineDate?: Date;
}

export default class Task {
    id: number;
    title: string;
    isDone: boolean;
    additionDate: Date;
    beginDate?: Date;
    deadlineDate?: Date;
    stages: Stage[] = new Array<Stage>();

    constructor(props: ITaskProps) {
        this.id = props.id ?? 0;
        this.title = props.title;
        this.isDone = Boolean(props.isDone);
        this.additionDate = props.additionDate ?? new Date();
        this.beginDate = props.beginDate;
        this.deadlineDate = props.deadlineDate;
    }
}