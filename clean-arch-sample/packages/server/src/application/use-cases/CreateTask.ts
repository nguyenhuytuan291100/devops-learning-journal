import { UseCase } from "../contracts/UseCase";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";

export type CreateTaskInput = { id: string; title: string };
export type CreateTaskOutput = { id: string; title: string; done: boolean; createdAt: string };

export class CreateTask implements UseCase<CreateTaskInput, CreateTaskOutput> {
  constructor(private repo: TaskRepository) {}
  async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const task = Task.create(input.title, input.id);
    await this.repo.save(task);
    const t = task.toJSON();
    return { id: t.id, title: t.title, done: t.done, createdAt: t.createdAt.toISOString() };
  }
}
