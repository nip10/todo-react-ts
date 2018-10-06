import * as actionTypes from './../actions/actionTypes';
import format from 'date-fns/format';
import get from 'lodash/get';
import { Reducer } from 'redux';
import { ITodo } from './../../types/todo';

type ITodosState = ITodo[];

const initialState: ITodosState = [];

const addTodo = (state: ITodosState, action: any) => {
  const newTodo = {
    id: get(state[state.length - 1], 'id', 0) + 1,
    text: action.text,
    completed: false,
    createdAt: format(new Date(), 'DD-MM-YYYY HH:mm'),
  };
  return [...state, newTodo];
};

const deleteTodo = (state: ITodosState, action: any) => {
  return state.filter(todo => todo.id !== action.todoId);
};

const toggleTodo = (state: ITodosState, action: any) => {
  return state.map(todo => {
    if (todo.id !== action.todoId) { return todo; }
    return {
      ...todo,
      completed: !todo.completed,
      completedAt: format(new Date(), 'DD-MM-YYYY HH:mm')
    }
  });
};

const updateTodo = (state: ITodosState, action: any) => {
  return state.map(todo => {
    if (todo.id !== action.todoId) { return todo; }
    return {
      ...todo,
      text: action.text,
      updatedAt: format(new Date(), 'DD-MM-YYYY HH:mm')
    }
  });
};

const todoReducer: Reducer<ITodosState> = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TODO: return addTodo(state, action);
    case actionTypes.DELETE_TODO: return deleteTodo(state, action);
    case actionTypes.TOGGLE_TODO: return toggleTodo(state, action);
    case actionTypes.UPDATE_TODO: return updateTodo(state, action);
    default: return state;
  }
}

export default todoReducer;