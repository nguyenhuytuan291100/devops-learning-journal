import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import { Task } from "../../../domain/entities/Task";
import { prisma } from "./prismaClient";

export class TaskPrismaRepository implements TaskRepository {
  async save(task: Task): Promise<void> {
    const t = task.toJSON();
    await prisma.task.upsert({
      where: { id: t.id },
      update: { title: t.title, done: t.done, createdAt: t.createdAt },
      create: { id: t.id, title: t.title, done: t.done, createdAt: t.createdAt }
    });
  }
  async list(): Promise<Task[]> {
    const rows = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(r => Task.create(r.title, r.id, r.createdAt));
  }
  async findById(id: string): Promise<Task | null> {
    const r = await prisma.task.findUnique({ where: { id } });
    return r ? Task.create(r.title, r.id, r.createdAt) : null;
  }
}
