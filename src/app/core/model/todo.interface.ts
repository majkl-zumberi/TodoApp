import { TodoStep } from './todo-step.interface';
import { forUser } from './todo-forUser.interface';

export interface Todo {
    id: number;
    title: string;
    description: string;
    steps: TodoStep[];
    forUser:forUser[];
}
