export interface TaskProps {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
}

export class Task {
  private props: TaskProps;
  private constructor(props: TaskProps) { this.props = props; }
  static create(title: string, id: string, createdAt = new Date()) {
    if (!title || title.trim().length < 3) throw new Error("Title too short");
    return new Task({ id, title: title.trim(), done: false, createdAt });
  }
  complete() { this.props.done = true; }
  toJSON() { return { ...this.props }; }
}
