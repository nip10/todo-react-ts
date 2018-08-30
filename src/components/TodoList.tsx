import * as React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

interface ITodo {
  id: number,
  title: string,
  completed: boolean,
}

interface ITodoListProps {
  todos: ITodo[]
}

const TodoListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

export default class TodoList extends React.Component<ITodoListProps, {}> {
  private renderTodoItems = (todos) => {
    return (<TodoListWrapper>
      {todos.map(todo => (
        <TodoItem key={todo.id} title={todo.title} />
      ))}
    </TodoListWrapper>);
  }

  public render() {
    const { todos } = this.props;
    console.log('todos: ', todos);
    if (todos && todos.length > 0) {
      return this.renderTodoItems(todos);
    } else {
      return <p> Add your first todo! </p>;
    }
  }
}