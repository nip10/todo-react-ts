import * as React from 'react';
import TodoItem from './TodoItem';

interface ITodo {
  id: number,
  title: string,
  completed: boolean,
}

interface ITodoListProps {
  todos: ITodo[]
}

export default class TodoList extends React.Component<ITodoListProps, {}> {
  private renderTodoItems = (todos) => {
    return (<ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} title={todo.title} />
      ))}
    </ul>);
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