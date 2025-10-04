import { UseCase } from "../contracts/UseCase";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class CompleteTask implements UseCase<{ id: string }, { ok: boolean }> {
  constructor(private repo: TaskRepository) {}
  async execute({ id }: { id: string }): Promise<{ ok: boolean }> {
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    task.complete();
    await this.repo.save(task);
    return { ok: true };
  }
}
