import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import TodoList from './TodoList';
import Header from './Header';
import AddTodo from './AddTodo';

const Wrapper = styled.div`
  margin: 0 auto;
  width: calc(768px + 16px * 2);
  min-height: 100vh;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

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

  /**
   * Add a todo to app's state
   *
   * @private
   * @memberof App
   */
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

  /**
   * Get the todo's saved in localstorage and pass them to the app's state
   *
   * @private
   * @memberof App
   */
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

  /**
   * Save todos from the app's state in localstorage
   *
   * @private
   * @memberof App
   */
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
      <Wrapper>
        <Header />
        <AddTodo add={this.addTodoHandler} />
        <TodoList todos={this.state.todos} />
      </Wrapper>
    );
  }
}
