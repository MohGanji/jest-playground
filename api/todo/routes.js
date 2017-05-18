import { Router } from 'express';
import { addTodo } from './controller';

const routes = new Router();

routes.post('/new-todo', addTodo);

export default routes;