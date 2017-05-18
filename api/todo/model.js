import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  text: String,
});

const Todo = mongoose.model('todos', TodoSchema);

export default Todo;