import React, { Component } from "react";
import { Todos } from "./../models/todos";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import { ITodo } from "./../types/todo";

interface IHomeState {
  todos: ITodo[];
}

export default class Home extends Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [...Todos.items]
    };
  }

  /**
   * Add a todo to app's state
   *
   * @param newTodo - todo object (UPDATE THIS)
   * @private
   * @memberof App
   */
  private addTodo = (text: string): void => {
    Todos.add(text);
    this.setState({ todos: [...Todos.items] });
  };

  /**
   * Remove a todo from app's state.
   *
   * @param todoId - Todo id (UPDATE THIS)
   * @private
   * @memberof App
   */
  private removeTodo = (todoId: number): void => {
    Todos.remove(todoId);
    this.setState({ todos: [...Todos.items] });
  };

  /**
   * Update a todo's text.
   *
   * @param todoId - todo id
   * @param text - todo text
   * @private
   * @memberof App
   */
  private editTodo = (todoId: number, text: string): void => {
    Todos.update(todoId, text);
    this.setState({ todos: [...Todos.items] });
  };

  /**
   * Update a todo's status.
   *
   * @param todoId - todo id
   * @private
   * @memberof App
   */
  private toggleTodo = (todoId: number) => {
    Todos.toggle(todoId);
    this.setState({ todos: [...Todos.items] });
  };

  /**
   * Save todos from the app's state in localstorage
   *
   * @private
   * @memberof App
   */
  private saveStateToLocalStorage = (): void => {
    Todos.save();
  };

  public componentDidMount = (): void => {
    Todos.populate();
    this.setState({ todos: [...Todos.items] });
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
  };

  public componentWillUnmount = (): void => {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage);
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  };

  public render() {
    return (
      <>
        <Header />
        <AddTodo />
        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
          editTodo={this.editTodo}
          toggleTodo={this.toggleTodo}
        />
      </>
    );
  }
}
