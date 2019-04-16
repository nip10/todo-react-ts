import format from "date-fns/format";
import { updateObject } from "../utils";
import {
  ITodoState,
  TodoActionTypes,
  TODO_ADD_SUCCESS,
  TODO_ADD_FAIL,
  IActionTodoAddSuccess,
  TODO_REMOVE_SUCCESS,
  TODO_REMOVE_FAIL,
  IActionTodoRemoveSuccess,
  TODO_TOGGLE_SUCCESS,
  TODO_TOGGLE_FAIL,
  IActionTodoToggleSuccess
  // IActionTodoAddFail
  // IActionTodoRemoveFail
  // IActionTodoToggleFail
} from "../store/types/todo";

const initialState: ITodoState = {
  items: []
};

const todoAddSuccess = (state: ITodoState, action: IActionTodoAddSuccess) => {
  return updateObject(state, {
    items: [
      ...state.items,
      {
        id: action.payload.id,
        text: action.payload.text,
        createdAt: format(new Date(), "DD-MM-YYYY HH:mm"),
        completed: false
      }
    ]
  });
};

// const todoAddFail = (state: ITodoState, action: IActionTodoAddFail) => {
//   return updateObject(state, {
//     error: action.payload.error
//   });
// };

const todoRemoveSuccess = (
  state: ITodoState,
  action: IActionTodoRemoveSuccess
) => {
  const filteredItems = state.items.filter(
    item => item.id !== action.payload.id
  );
  return updateObject(state, { items: filteredItems });
};

// const todoRemoveFail = (state: ITodoState, action: IActionTodoRemoveFail) => {
//   return updateObject(state, {
//     error: action.payload.error
//   });
// };

const todoToggleSuccess = (
  state: ITodoState,
  action: IActionTodoToggleSuccess
) => {
  const todoIndex = state.items.findIndex(
    todo => todo.id === action.payload.id
  );
  state.items[todoIndex].completed = !state.items[todoIndex].completed;
  return state;
};

// const todoToggleFail = (state: ITodoState, action: IActionTodoToggleFail) => {
//   return updateObject(state, {
//     error: action.payload.error
//   });
// };

const reducer = (state = initialState, action: TodoActionTypes): ITodoState => {
  switch (action.type) {
    case TODO_ADD_SUCCESS:
      return todoAddSuccess(state, action);
    case TODO_ADD_FAIL:
      console.error("Error:", action.payload.error);
      // return todoAddFail(state, action);
      return state;
    case TODO_REMOVE_SUCCESS:
      return todoRemoveSuccess(state, action);
    case TODO_REMOVE_FAIL:
      console.error("Error:", action.payload.error);
      // return todoRemoveFail(state, action);
      return state;
    case TODO_TOGGLE_SUCCESS:
      return todoToggleSuccess(state, action);
    case TODO_TOGGLE_FAIL:
      console.error("Error:", action.payload.error);
      // return TODO_TOGGLE_FAIL(state, action);
      return state;
    default:
      return state;
  }
};

export default reducer;
