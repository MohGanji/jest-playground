/* eslint-disable no-console */

import Todo from './model';

export const addTodo = async (req, res, next) => {
  const { text } = req.body;
  try {
    const todo = await Todo.create({ text });
    return res.status(201).json(todo);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
