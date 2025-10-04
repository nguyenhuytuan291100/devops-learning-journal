import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  list(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
}
