import * as React from 'react';

interface ITodoItemProps {
  title: string
}

const TodoItem = (props: ITodoItemProps) => <li> {props.title} </li>;

export default TodoItem;