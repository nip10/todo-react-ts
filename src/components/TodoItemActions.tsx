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
  isEditing: boolean,
  removeTodo: (todoId: number) => void,
  editTodo: (todoId: number, todoText: string) => void,
  toggleIsEditing: () => void,
  textInput: React.RefObject<HTMLInputElement>
}

const TodoItemActions = (props: ITodoItemActionsProps) => {

  const removeTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    props.removeTodo(props.id);
  }

  const editTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const todoRef = props.textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      props.editTodo(props.id, todoRef.value);
      todoRef.value = '';
    }
    props.toggleIsEditing();
  }

  const renderEditAndRemoveButtons = () => (
    <Wrapper>
      <EditButton onClick={props.toggleIsEditing}>Edit</EditButton>
      <RemoveButton onClick={removeTodoHandler}>Remove</RemoveButton>
    </Wrapper>
  )

  const renderSaveAndCancelButtons = () => (
    <Wrapper>
      <EditButton onClick={editTodoHandler}>Save</EditButton>
      <RemoveButton onClick={props.toggleIsEditing}>Cancel</RemoveButton>
    </Wrapper>
  )

  return props.isEditing ? renderSaveAndCancelButtons() : renderEditAndRemoveButtons();
};

export default TodoItemActions;