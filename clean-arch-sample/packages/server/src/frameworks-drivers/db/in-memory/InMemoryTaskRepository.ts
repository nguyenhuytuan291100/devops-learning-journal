import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import { Task } from "../../../domain/entities/Task";

export class InMemoryTaskRepository implements TaskRepository {
  private store = new Map<string, Task>();
  async save(task: Task): Promise<void> { this.store.set(task.toJSON().id, task); }
  async list(): Promise<Task[]> { return Array.from(this.store.values()); }
  async findById(id: string): Promise<Task | null> { return this.store.get(id) ?? null; }
}
