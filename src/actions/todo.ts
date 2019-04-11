import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  TODO_ADD_SUCCESS,
  IActionTodoAddSuccess,
  TODO_ADD_FAIL,
  IActionTodoAddFail
} from "../store/types/todo";
import { IAppState } from "../store/types/auth";

export const addTodo = (
  text: string
): ThunkAction<void, IAppState, null, Action<string>> => async dispatch => {
  try {
    // TODO: This request will always fail without the x-auth token...
    const res = await axios.post("localhost:3001/todos", { text });
    console.log("Response from adding todo:", res);
    dispatch(addTodoSuccess(text));
  } catch (err) {
    console.log("Error from adding todo:", err);
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
