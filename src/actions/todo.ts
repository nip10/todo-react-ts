import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  TODO_ADD_SUCCESS,
  IActionTodoAddSuccess,
  TODO_ADD_FAIL,
  IActionTodoAddFail,
  TODO_REMOVE_SUCCESS,
  IActionTodoRemoveSuccess,
  TODO_REMOVE_FAIL,
  IActionTodoRemoveFail
} from "../store/types/todo";
import { IAppState } from "../store";

export const addTodoLocal = (text: string) => (dispatch: any) => {
  // We can assume the user is NOT authenticated when it gets here
  dispatch(addTodoSuccess(text));
};

export const addTodoDb = (
  text: string
): ThunkAction<void, IAppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  // We can assume the user is authenticated when it gets here
  try {
    await axios.post(
      "http://localhost:3001/todos",
      { text },
      { headers: { "x-auth": getState().auth.token } }
    );
    dispatch(addTodoSuccess(text));
  } catch (err) {
    dispatch(addTodoFail(err));
  }
};

export const addTodoSuccess = (text: string): IActionTodoAddSuccess => {
  return {
    type: TODO_ADD_SUCCESS,
    payload: {
      text
    }
  };
};

export const addTodoFail = (error: string): IActionTodoAddFail => {
  return {
    type: TODO_ADD_FAIL,
    payload: {
      error
    }
  };
};

export const removeTodoLocal = (id: number) => (dispatch: any) => {
  // We can assume the user is NOT authenticated when it gets here
  dispatch(removeTodoSuccess(id));
};

export const removeTodoDb = (
  id: number
): ThunkAction<void, IAppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  // We can assume the user is authenticated when it gets here
  try {
    await axios.post(
      "http://localhost:3001/todos",
      { id },
      { headers: { "x-auth": getState().auth.token } }
    );
    dispatch(removeTodoSuccess(id));
  } catch (err) {
    dispatch(removeTodoFail(err));
  }
};

export const removeTodoSuccess = (id: number): IActionTodoRemoveSuccess => {
  return {
    type: TODO_REMOVE_SUCCESS,
    payload: {
      id
    }
  };
};

export const removeTodoFail = (error: string): IActionTodoRemoveFail => {
  return {
    type: TODO_REMOVE_FAIL,
    payload: {
      error
    }
  };
};
