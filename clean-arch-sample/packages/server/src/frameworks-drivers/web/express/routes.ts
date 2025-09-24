import { Router } from "express";
import { TaskController } from "../../interface-adapters/controllers/TaskController";
import { InMemoryTaskRepository } from "../db/in-memory/InMemoryTaskRepository";
import { CreateTask } from "../../application/use-cases/CreateTask";
import { ListTasks } from "../../application/use-cases/ListTasks";
import { CompleteTask } from "../../application/use-cases/CompleteTask";

const repo = new InMemoryTaskRepository();
const createTask = new CreateTask(repo);
const listTasks = new ListTasks(repo);
const completeTask = new CompleteTask(repo);
const controller = new TaskController(createTask, listTasks, completeTask);

export function makeRoutes() {
  const r = Router();
  r.get("/tasks", controller.list);
  r.post("/tasks", controller.create);
  r.post("/tasks/:id/complete", controller.complete);
  return r;
}
