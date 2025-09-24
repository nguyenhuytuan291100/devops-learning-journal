import { UseCase } from "../contracts/UseCase";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class ListTasks implements UseCase<void, any[]> {
  constructor(private repo: TaskRepository) {}
  async execute(): Promise<any[]> {
    const tasks = await this.repo.list();
    return tasks.map(t => {
      const j = t.toJSON();
      return { ...j, createdAt: j.createdAt.toISOString() };
    });
  }
}
