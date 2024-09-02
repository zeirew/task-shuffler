import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export class TaskController {
  static async getTasks(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);

    const tasks = await taskRepository.find();

    return res.status(200).json({
      data: tasks,
    });
  }

  static async getTask(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const id = parseInt(req.params['id'], 10);

    const task = await taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Failed to find task' });
    }

    return res.status(200).json({
      data: task,
    });
  }

  static async createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const task = new Task();
    task.title = title;
    task.description = description;
    const taskRepository = AppDataSource.getRepository(Task);
    await taskRepository.save(task);
    return res.status(200).json({ message: 'Task created successfully', task });
  }

  static async updateTask(req: Request, res: Response) {
    const id = parseInt(req.params['id'], 10);
    const { title, description, completed, completedAt } = req.body;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Failed to find task' });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;
    task.completedAt = completedAt;
    await taskRepository.save(task);
    return res.status(200).json({ message: 'Task updated successfully', task });
  }

  static async deleteTask(req: Request, res: Response) {
    const id = parseInt(req.params['id'], 10);
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Failed to find task' });
    }

    await taskRepository.remove(task);
    return res.status(200).json({ message: 'Task removed successfully', task });
  }

  static async getRandomTask(req: Request, res: Response) {
    try {
      const task = await AppDataSource.manager
        .createQueryBuilder(Task, 'task')
        .where('task.completed = :completed', { completed: false })
        .orderBy('RANDOM()')
        .getOne();

      if (!task) {
        return res
          .status(404)
          .json({ error: 'Failed to retrieve random task' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).send('Error retrieving random task');
    }
  }
}

//Next: add frontend 
//To-Do: Add user entity... we should also be able to associate a user with an active task... 