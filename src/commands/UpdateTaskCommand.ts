import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private previousTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const original = this.taskList.updateTask(this.taskId, this.updates);
    if (original) {
      this.previousTask = { ...original, ...this.updates }; // Save before changes
    }
  }

  undo(): void {
    if (this.previousTask) {
      this.taskList.updateTask(this.taskId, this.previousTask);
    }
  }
}

