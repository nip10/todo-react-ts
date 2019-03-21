import { ITodo } from "../../types/todo";

export interface ITodoState {
  items: ITodo[];
}

export const TODO_ADD_SUCCESS = "TODO_ADD_SUCCESS";

export interface IActionTodoAddSuccess {
  type: typeof TODO_ADD_SUCCESS;
  payload: {
    text: string;
  };
}

export const TODO_ADD_FAIL = "TODO_ADD_FAIL";

export interface IActionTodoAddFail {
  type: typeof TODO_ADD_FAIL;
  payload: {
    error: string;
  };
}

export type TodoActionTypes = IActionTodoAddSuccess | IActionTodoAddFail;
