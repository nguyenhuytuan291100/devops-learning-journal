export const TaskPresenter = {
  created(payload: any) { return payload; },
  list(payload: any[]) { return payload; },
  completed() { return { ok: true }; }
};
