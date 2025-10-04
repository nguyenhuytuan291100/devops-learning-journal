export type TaskDTO = { id: string; title: string; done: boolean; createdAt: string };

const BASE = (import.meta as any).env.VITE_API_BASE ?? "http://localhost:3001/api";

export const TaskApiGateway = {
  async list(): Promise<TaskDTO[]> {
    const res = await fetch(`${BASE}/tasks`);
    return await res.json();
  },
  async create(title: string): Promise<TaskDTO> {
    const id = crypto.randomUUID();
    const res = await fetch(`${BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title })
    });
    return await res.json();
  },
  async complete(id: string): Promise<void> {
    await fetch(`${BASE}/tasks/${id}/complete`, { method: "POST" });
  }
};
