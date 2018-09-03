import React, { Component } from 'react';
import get from 'lodash/get';
import styled, { injectGlobal } from 'styled-components';
import { colors } from '../theme/index';
import GithubCorner from 'react-github-corner';
import TodoList from './TodoList';
import Header from './Header';
import AddTodo from './AddTodo';
import ITodo from './../types/todo';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  background-color: ${colors.backgroundColor};
  font-family: 'Roboto', sans-serif;
}`

const Wrapper = styled.div`
  margin: 2em auto;
  max-width: 900px;
  background-color: white;
  padding: 1em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
`;

interface IAppState {
  todos: ITodo[]
}

export default class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
    }
  }

  /**
   * Add a todo to app's state
   *
   * @param newTodo - todo object (UPDATE THIS)
   * @private
   * @memberof App
   */
  private addTodo = (newTodo: ITodo): void => {
    // Create a new id by incrementing the last saved todo id
    const newTodoId = get(this.state.todos[this.state.todos.length - 1], 'id', 0) + 1;
    newTodo.id = newTodoId;
    // Merge the new todo with the current todo list
    const todos = this.state.todos.concat(newTodo);
    this.setState({
      todos
    });
  }

  /**
   * Remove a todo from app's state.
   *
   * @param todoId - Todo id (UPDATE THIS)
   * @private
   * @memberof App
   */
  private removeTodo = (todoId: number): void => {
    // copy current list of todos
    const list = [...this.state.todos];
    // filter out the item being deleted
    const updatedTodos = list.filter(item => item.id !== todoId);

    this.setState({ todos: updatedTodos });
  }

  /**
   * Update a todo's text.
   *
   * @param todoId - todo id
   * @param todoText - todo text
   * @private
   * @memberof App
   */
  private editTodo = (todoId: number, todoText: string): void => {
    // copy current list of todos
    const list = [...this.state.todos];
    // get index of the current todo
    const todoIndex = list.findIndex(todo => todo.id === todoId);
    // update todo
    list[todoIndex].text = todoText;

    this.setState({ todos: list });
  }

  /**
   * Update a todo's status.
   *
   * @param todoId - todo id
   * @private
   * @memberof App
   */
  private toggleTodo = (todoId: number) => {
    // copy current list of todos
    const list = [...this.state.todos];
    // get index of the current todo
    const todoIndex = list.findIndex(todo => todo.id === todoId);
    // update todo status
    list[todoIndex].completed = !list[todoIndex].completed;

    this.setState({ todos: list });
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
        <AddTodo addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
          editTodo={this.editTodo}
          toggleTodo={this.toggleTodo}
        />
        <GithubCorner href='https://github.com/nip10/todo-react-ts' />
      </Wrapper>
    );
  }
}
