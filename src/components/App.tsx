import * as React from 'react';
import * as _ from 'lodash';
import TodoList from './TodoList';
import Header from './Header';
import AddTodo from './AddTodo';

interface ITodo {
  id: number,
  title: string,
  completed: boolean,
}

interface IAppState {
  todos: ITodo[]
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
    }
  }

  private addTodoHandler = (newTodo: ITodo): void => {
    // Create a new id by incrementing the last saved todo id
    const newTodoId = _.get(this.state.todos[this.state.todos.length - 1], 'id', 0) + 1;
    newTodo.id = newTodoId;
    // Merge the new todo with the current todo list
    const todos = this.state.todos.concat(newTodo);
    this.setState({
      todos
    });
  }

  private hydrateStateWithLocalStorage = (): void => {
    if (localStorage.hasOwnProperty('todos')) {
      const todos = localStorage.getItem('todos');
      if (todos) {
        try {
          const parsedTodos = JSON.parse(todos);
          this.setState({ todos: parsedTodos });
        } catch (e) {
          this.setState({ todos: [] });
        }
      }
    }
  }

  private saveStateToLocalStorage = (): void => {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  public componentDidMount = (): void => {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage
    );
  }

  public componentWillUnmount = (): void => {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  public render() {
    return (
      <div>
        <Header />
        <AddTodo onAdd={this.addTodoHandler} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
