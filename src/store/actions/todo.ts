import * as actionTypes from './actionTypes';

export const addTodo = (text: string) => {
  return { type: actionTypes.ADD_TODO, text };
}

export const deleteTodo = (todoId: number) => {
  return { type: actionTypes.DELETE_TODO, todoId };
}

export const toggleTodo = (todoId: number) => {
  return { type: actionTypes.TOGGLE_TODO, todoId };
}

export const editTodo = (todoId: number, text: string) => {
  return { type: actionTypes.EDIT_TODO, todoId, text };
}