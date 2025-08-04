import { TaskManager } from './services/TaskManager';
import { Task } from './models/Task';
import { v4 as uuidv4 } from 'uuid';

const manager = new TaskManager();

// Приклад задач
const task1: Task = {
  id: uuidv4(),
  title: 'Buy groceries',
  description: 'Milk, Bread, Eggs',
  completed: false,
  createdAt: new Date(),
  priority: 'medium',
};

const task2: Task = {
  id: uuidv4(),
  title: 'Study TypeScript',
  completed: false,
  createdAt: new Date(),
  priority: 'high',
};

// Дії
manager.addTask(task1);
manager.addTask(task2);
manager.printTasks();

manager.completeTask(task1.id);
manager.printTasks();

manager.undo();
manager.printTasks();

manager.redo();
manager.printTasks();

manager.updateTask(task2.id, { title: 'Study Command Pattern' });
manager.printTasks();

manager.removeTask(task1.id);
manager.printTasks();

manager.undo();
manager.printTasks();
