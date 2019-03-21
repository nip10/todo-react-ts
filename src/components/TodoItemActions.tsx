import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTimes,
  faSave
} from "@fortawesome/free-solid-svg-icons";

interface ITodoItemActionsProps {
  id: number;
  isEditing: boolean;
  removeTodo: (todoId: number) => void;
  editTodo: (todoId: number, text: string) => void;
  toggleTodo?: (todoId: number) => void;
  toggleIsEditing: () => void;
  textInput?: React.RefObject<HTMLInputElement>;
}

const Wrapper = styled.div`
  float: right;
`;

const IconWrapper = styled.span`
  margin-right: 0.5em;
  cursor: pointer;
`;

const TodoItemActions = (props: ITodoItemActionsProps) => {
  const toggleTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!props.toggleTodo) {
      return;
    }
    props.toggleTodo(props.id);
  };

  const removeTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    props.removeTodo(props.id);
  };

  const editTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!props.textInput) {
      return;
    }
    const todoRef = props.textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      props.editTodo(props.id, todoRef.value);
      todoRef.value = "";
    }
    props.toggleIsEditing();
  };

  const renderEditAndRemoveButtons = () => (
    <Wrapper>
      <IconWrapper onClick={props.toggleIsEditing}>
        <FontAwesomeIcon icon={faPen} color="grey" />
      </IconWrapper>
      <IconWrapper onClick={removeTodoHandler}>
        <FontAwesomeIcon icon={faTimes} color="red" />
      </IconWrapper>
      <IconWrapper onClick={toggleTodoHandler}>
        <FontAwesomeIcon icon={faCheck} color="green" />
      </IconWrapper>
    </Wrapper>
  );

  const renderSaveAndCancelButtons = () => (
    <Wrapper>
      <IconWrapper onClick={editTodoHandler}>
        <FontAwesomeIcon icon={faSave} color="grey" />
      </IconWrapper>
      <IconWrapper onClick={props.toggleIsEditing}>
        <FontAwesomeIcon icon={faTimes} color="red" />
      </IconWrapper>
    </Wrapper>
  );

  return props.isEditing
    ? renderSaveAndCancelButtons()
    : renderEditAndRemoveButtons();
};

export default TodoItemActions;
