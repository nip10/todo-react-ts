import * as React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

interface ITodo {
  id: number,
  title: string,
  completed: boolean,
}

interface ITodoListProps {
  todos: ITodo[],
  removeTodo: (todoId: number) => void
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
          <TodoItem key={index} id={todo.id} title={todo.title} remove={this.props.removeTodo} />
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