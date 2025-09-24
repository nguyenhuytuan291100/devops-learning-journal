import { useCallback, useEffect, useState } from "react";
import { TaskApiGateway, TaskDTO } from "../gateways/TaskApiGateway";

export function useTasks() {
  const [items, setItems] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try { setItems(await TaskApiGateway.list()); } finally { setLoading(false); }
  }, []);

  const add = useCallback(async (title: string) => {
    const t = await TaskApiGateway.create(title);
    setItems(prev => [t, ...prev]);
  }, []);

  const complete = useCallback(async (id: string) => {
    await TaskApiGateway.complete(id);
    setItems(prev => prev.map(x => (x.id === id ? { ...x, done: true } : x)));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { items, loading, refresh, add, complete };
}
