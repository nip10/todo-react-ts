import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import format from "date-fns/format";
import get from "lodash/get";
import {
  TODO_ADD_SUCCESS,
  IActionTodoAddSuccess,
  TODO_ADD_FAIL,
  IActionTodoAddFail,
  TODO_REMOVE_SUCCESS,
  IActionTodoRemoveSuccess,
  TODO_REMOVE_FAIL,
  IActionTodoRemoveFail,
  IActionTodoToggleSuccess,
  TODO_TOGGLE_SUCCESS,
  IActionTodoToggleFail,
  TODO_TOGGLE_FAIL
} from "../store/types/todo";
import { IAppState } from "../store";

export const addTodoLocal = (text: string) => (
  dispatch: any,
  getState: any
) => {
  // We can assume the user is NOT authenticated when it gets here
  const currentTodos = getState().todos.items;
  // Create a new id by incrementing the last saved todo id.
  // This is only required for local todos, since they don't get an id from the db when inserted.
  const newTodoId = get(currentTodos[currentTodos.length - 1], "id", 0) + 1;
  dispatch(addTodoSuccess(newTodoId, text));
};

export const addTodoDb = (
  text: string
): ThunkAction<void, IAppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  // We can assume the user is authenticated when it gets here
  try {
    const todo = await axios.post(
      "http://localhost:3001/todos",
      { text },
      { headers: { "x-auth": getState().auth.token } }
    );
    dispatch(addTodoSuccess(todo.data._id, text));
  } catch (err) {
    dispatch(addTodoFail(err));
  }
};

export const addTodoSuccess = (
  id: string | null,
  text: string
): IActionTodoAddSuccess => {
  return {
    type: TODO_ADD_SUCCESS,
    payload: {
      id,
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

export const removeTodoLocal = (id: string) => (dispatch: any) => {
  // We can assume the user is NOT authenticated when it gets here
  dispatch(removeTodoSuccess(id));
};

export const removeTodoDb = (
  id: string
): ThunkAction<void, IAppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  // We can assume the user is authenticated when it gets here
  try {
    await axios.delete(`http://localhost:3001/todos/${id}`, {
      headers: { "x-auth": getState().auth.token }
    });
    dispatch(removeTodoSuccess(id));
  } catch (err) {
    dispatch(removeTodoFail(err));
  }
};

export const removeTodoSuccess = (id: string): IActionTodoRemoveSuccess => {
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

export const toggleTodoLocal = (id: string) => (dispatch: any) => {
  // We can assume the user is NOT authenticated when it gets here
  dispatch(toggleTodoSuccess(id));
};

export const toggleTodoDb = (
  id: string
): ThunkAction<void, IAppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  // We can assume the user is authenticated when it gets here
  try {
    const todoIndex = getState().todos.items.findIndex(todo => todo.id === id);
    const todo = getState().todos.items[todoIndex];
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
      completedAt: todo.completed
        ? null
        : format(new Date(), "DD-MM-YYYY HH:mm")
    };
    await axios.patch(`http://localhost:3001/todos/${id}`, updatedTodo, {
      headers: { "x-auth": getState().auth.token }
    });
    dispatch(toggleTodoSuccess(id));
  } catch (err) {
    dispatch(toggleTodoFail(err));
  }
};

export const toggleTodoSuccess = (id: string): IActionTodoToggleSuccess => {
  return {
    type: TODO_TOGGLE_SUCCESS,
    payload: {
      id
    }
  };
};

export const toggleTodoFail = (error: string): IActionTodoToggleFail => {
  return {
    type: TODO_TOGGLE_FAIL,
    payload: {
      error
    }
  };
};
