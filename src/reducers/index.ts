import { combineReducers } from "redux";
import authReducer from "./auth";
import todoReducer from "./todo";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer
});

export default rootReducer;
