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
    // TODO: Add x-auth token to headers
    const res = await axios.post(
      "http://localhost:3001/todos",
      { text },
      { headers: { "x-auth": getState().auth.token } }
    );
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
