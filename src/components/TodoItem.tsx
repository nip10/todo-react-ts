import * as React from 'react';
import styled from 'styled-components';

interface ITodoItemProps {
  title: string
}

const TodoItemWrapper = styled.li`
  padding: 1em;
  margin-bottom: 1em;
  border: 1px solid black;
`
const TodoItem = (props: ITodoItemProps) => <TodoItemWrapper> {props.title} </TodoItemWrapper>;

export default TodoItem;