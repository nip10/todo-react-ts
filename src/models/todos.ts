import format from 'date-fns/format';
import get from 'lodash/get';
import { ITodo } from './../types/todo';

export interface ITodos {
  items: ITodo[],
  populate: () => void,
  toggle: (todoId: number) => void,
  add: (text: string) => void,
  remove: (todoId: number) => void,
  update: (todoId: number, text: string) => void,
  save: () => void,
}

const Todos: ITodos = {
  items: [],
  populate() {
    if (localStorage.hasOwnProperty('todos')) {
      const todos = localStorage.getItem('todos');
      if (todos) {
        try {
          this.items = JSON.parse(todos);
        } catch (e) {
          this.items = [];
        }
      }
    }
  },
  toggle(todoId: number) {
    // get index of todo
    const todoIndex = this.items.findIndex(todo => todo.id === todoId);
    this.items[todoIndex].completed = !this.items[todoIndex].completed;
  },
  add(text: string) {
    // Create a new id by incrementing the last saved todo id
    const newTodoId = get(this.items[this.items.length - 1], 'id', 0) + 1;
    const newTodo = {
      id: newTodoId,
      text,
      completed: false,
      createdAt: format(new Date(), 'DD-MM-YYYY HH:mm'),
    }
    this.items.push(newTodo);
  },
  remove(todoId: number) {
    this.items = this.items.filter(item => item.id !== todoId);
  },
  update(todoId: number, text: string) {
    // get index of the current todo
    const todoIndex = this.items.findIndex(todo => todo.id === todoId);
    this.items[todoIndex].text = text;
    this.items[todoIndex].updatedAt = format(new Date(), 'DD-MM-YYYY HH:mm');
  },
  save() {
    localStorage.setItem('todos', JSON.stringify(this.items));
  },
}

export default Todos;