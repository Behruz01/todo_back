import { Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";


export type TodoRepo = Repository<TodoEntity>