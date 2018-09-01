import * as React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

import ITodo from './../types/todo';

interface ITodoListProps {
  todos: ITodo[],
  removeTodo: (todoId: number) => void,
  editTodo: (todoId: number, todoText: string) => void,
}

const TodoListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: 1px solid #e6e6e6;
`

export default class TodoList extends React.Component<ITodoListProps, {}> {
  private renderTodoItems = (todos) => {
    return (
      <TodoListWrapper>
        {todos.map((todo, index) => (
          <TodoItem key={index} id={todo.id} text={todo.text} remove={this.props.removeTodo} edit={this.props.editTodo} />
        ))}
      </TodoListWrapper>
    );
  }

  public render() {
    const { todos } = this.props;
    if (todos && todos.length > 0) {
      return this.renderTodoItems(todos);
    } else {
      return <p> Add your first todo! </p>;
    }
  }
}