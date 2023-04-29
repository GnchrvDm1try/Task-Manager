import Task from './Task';

// isDone accepts a boolean or number, where 0 is false, and any other number - true
interface IStageProps {
    title: string;
    taskId: number;
    id: number;
    isDone?: boolean | number;
    description?: string;
    deadlineDate?: Date;
}

export default class Stage {
    id: number;
    taskId: number;
    title: string;
    isDone: boolean;
    description?: string;
    deadlineDate?: Date;
    task: Task | undefined;

    constructor(props: IStageProps) {
        this.id = props.id;
        this.taskId = props.taskId;
        this.title = props.title;
        this.isDone = Boolean(props.isDone);
        this.description = props.description;
        this.deadlineDate = props.deadlineDate;
    }
}