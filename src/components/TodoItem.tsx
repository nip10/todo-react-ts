import * as React from 'react';

interface IProps {
  title: string
}

const TodoItem = (props: IProps) => <li> {props.title} </li>;

export default TodoItem;