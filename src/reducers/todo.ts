import { updateObject } from "../utils";
import {
  TODO_ADD_SUCCESS,
  TODO_ADD_FAIL,
  IActionTodoAddSuccess,
  ITodoState,
  TodoActionTypes
  // IActionTodoAddFail
} from "../store/types/todo";

const initialState: ITodoState = {
  items: []
};

const todoAddSuccess = (state: ITodoState, action: IActionTodoAddSuccess) => {
  return updateObject(state, {
    items: [...state.items, { text: action.payload.text }]
  });
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
    default:
      return state;
  }
};

export default reducer;
