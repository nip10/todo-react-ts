import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import todoReducer from './store/reducers/todo';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  todos: todoReducer
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
