import { TodoStep } from './todo-step.interface';

export interface Todo {
    id: number;
    title: string;
    description: string;
    steps: TodoStep[];
}