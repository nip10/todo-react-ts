import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  float: right;
`;

const EditButton = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid black;
  background-color: #B37D4E;
  color: white;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid black;
  background-color: #CD5360;
  color: white;
  cursor: pointer;
`;

interface ITodoItemActionsProps {
  id: number,
  removeTodo: (todoId: number) => void
}

const TodoItemActions = (props: ITodoItemActionsProps) => {
  const removeTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    props.removeTodo(props.id);
  }
  return (
    <Wrapper>
      <EditButton>Edit</EditButton>
      <RemoveButton onClick={removeTodoHandler}>Remove</RemoveButton>
    </Wrapper>
  )
};

export default TodoItemActions;