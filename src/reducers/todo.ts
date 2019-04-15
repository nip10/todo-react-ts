import format from "date-fns/format";
import { updateObject } from "../utils";
import {
  TODO_ADD_SUCCESS,
  TODO_ADD_FAIL,
  IActionTodoAddSuccess,
  ITodoState,
  TodoActionTypes,
  TODO_REMOVE_SUCCESS,
  TODO_REMOVE_FAIL,
  IActionTodoRemoveSuccess
  // IActionTodoAddFail
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

const todoRemoveSuccess = (
  state: ITodoState,
  action: IActionTodoRemoveSuccess
) => {
  const filteredItems = state.items.filter(
    item => item.id !== action.payload.id
  );
  return updateObject(state, { items: filteredItems });
};

// const todoAddFail = (state: ITodoState, action: IActionTodoAddFail) => {
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
    default:
      return state;
  }
};

export default reducer;
