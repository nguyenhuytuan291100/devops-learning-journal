import { Task } from "../../domain/entities/Task";

export const TaskMapper = {
  toView(t: Task) {
    const j = t.toJSON();
    return { id: j.id, title: j.title, done: j.done, createdAt: j.createdAt.toISOString() };
  }
};
