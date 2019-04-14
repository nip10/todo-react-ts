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

export const TODO_REMOVE_SUCCESS = "TODO_REMOVE_SUCCESS";

export interface IActionTodoRemoveSuccess {
  type: typeof TODO_REMOVE_SUCCESS;
  payload: {
    id: number;
  };
}

export const TODO_REMOVE_FAIL = "TODO_REMOVE_FAIL";

export interface IActionTodoRemoveFail {
  type: typeof TODO_REMOVE_FAIL;
  payload: {
    error: string;
  };
}

export type TodoActionTypes =
  | IActionTodoAddSuccess
  | IActionTodoAddFail
  | IActionTodoRemoveSuccess
  | IActionTodoRemoveFail;
