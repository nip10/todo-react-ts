import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
import { loadState, saveState } from "./persistedState";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

type IAppState = ReturnType<typeof rootReducer>;

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(logger, thunk as ThunkMiddleware<IAppState, any>)
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

// TODO: Is there a need to unsubscribe ?

export default store;
