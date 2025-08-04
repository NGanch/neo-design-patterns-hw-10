import { TaskList } from '../models/TaskList';
import { CommandHistory } from '../commands/CommandHistory';
import { Task } from '../models/Task';
import { AddTaskCommand } from '../commands/AddTaskCommand';
import { RemoveTaskCommand } from '../commands/RemoveTaskCommand';
import { UpdateTaskCommand } from '../commands/UpdateTaskCommand';
import { CompleteTaskCommand } from '../commands/CompleteTaskCommand';

export class TaskManager {
  private taskList = new TaskList();
  private history = new CommandHistory();

  addTask(task: Task): void {
    this.history.executeCommand(new AddTaskCommand(this.taskList, task));
  }

  removeTask(id: string): void {
    this.history.executeCommand(new RemoveTaskCommand(this.taskList, id));
  }

  updateTask(id: string, updates: Partial<Task>): void {
    this.history.executeCommand(new UpdateTaskCommand(this.taskList, id, updates));
  }

  completeTask(id: string): void {
    this.history.executeCommand(new CompleteTaskCommand(this.taskList, id, true));
  }

  undo(): void {
    this.history.undo();
  }

  redo(): void {
    this.history.redo();
  }

  printTasks(): void {
    const tasks = this.taskList.getAllTasks();
    console.log('\nCurrent Tasks:');
    tasks.forEach((task) => {
      console.log(`- [${task.completed ? '✔' : ' '}] ${task.title} (ID: ${task.id})`);
    });
    console.log();
  }
}

