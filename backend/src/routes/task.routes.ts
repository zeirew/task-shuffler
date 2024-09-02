import * as express from 'express';
import { TaskController } from '../controllers/task.controller';

const Router = express.Router();

Router.get('/tasks', TaskController.getTasks);
Router.post('/task', TaskController.createTask);
Router.get('/task/random', TaskController.getRandomTask);
Router.get('/task/:id', TaskController.getTask);
Router.put('/task/:id', TaskController.updateTask);
Router.delete('/task/:id', TaskController.deleteTask);

export { Router as taskRouter };
