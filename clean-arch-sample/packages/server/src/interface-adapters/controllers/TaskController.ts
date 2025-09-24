import type { Request, Response } from "express";
import { z } from "zod";
import { CreateTask } from "../../application/use-cases/CreateTask";
import { ListTasks } from "../../application/use-cases/ListTasks";
import { CompleteTask } from "../../application/use-cases/CompleteTask";
import { TaskPresenter } from "../presenters/TaskPresenter";

export class TaskController {
  constructor(
    private createTask: CreateTask,
    private listTasks: ListTasks,
    private completeTask: CompleteTask
  ) {}

  list = async (_req: Request, res: Response) => {
    const output = await this.listTasks.execute();
    res.json(TaskPresenter.list(output));
  };

  create = async (req: Request, res: Response) => {
    const schema = z.object({ id: z.string().min(8), title: z.string().min(3) });
    const data = schema.parse(req.body);
    const output = await this.createTask.execute(data);
    res.status(201).json(TaskPresenter.created(output));
  };

  complete = async (req: Request, res: Response) => {
    const schema = z.object({ id: z.string().min(8) });
    const data = schema.parse({ id: req.params.id });
    await this.completeTask.execute(data);
    res.json(TaskPresenter.completed());
  };
}
