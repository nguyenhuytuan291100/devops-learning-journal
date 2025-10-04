import crypto from 'node:crypto';

export class TaskId {
  private constructor(private readonly value: string) {}
  static create(value?: string) {
    const v = value ?? crypto.randomUUID();
    if (!/^[-\w]{8,}$/.test(v)) throw new Error("Invalid TaskId");
    return new TaskId(v);
  }
  toString() { return this.value; }
}
