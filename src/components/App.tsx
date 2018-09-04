import GithubCorner from 'react-github-corner';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Todos } from '../models/todos';
import TodoList from './TodoList';
import Header from './Header';
import AddTodo from './AddTodo';
import { colors } from '../theme/index';
import { ITodo } from './../types/todo';

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
      todos: Todos.items,
    }
  }

  /**
   * Add a todo to app's state
   *
   * @param newTodo - todo object (UPDATE THIS)
   * @private
   * @memberof App
   */
  private addTodo = (task: string): void => {
    Todos.add(task);
    this.setState({ todos: Todos.items });
  }

  /**
   * Remove a todo from app's state.
   *
   * @param todoId - Todo id (UPDATE THIS)
   * @private
   * @memberof App
   */
  private removeTodo = (todoId: number): void => {
    Todos.remove(todoId);
    this.setState({ todos: Todos.items });
  }

  /**
   * Update a todo's text.
   *
   * @param todoId - todo id
   * @param task - todo text
   * @private
   * @memberof App
   */
  private editTodo = (todoId: number, task: string): void => {
    Todos.update(todoId, task);
    this.setState({ todos: Todos.items });
  }

  /**
   * Update a todo's status.
   *
   * @param todoId - todo id
   * @private
   * @memberof App
   */
  private toggleTodo = (todoId: number) => {
    Todos.toggle(todoId);
    this.setState({ todos: Todos.items });
  }

  /**
   * Save todos from the app's state in localstorage
   *
   * @private
   * @memberof App
   */
  private saveStateToLocalStorage = (): void => {
    Todos.save();
  }

  public componentDidMount = (): void => {
    Todos.populate();
    this.setState({ todos: Todos.items });
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
