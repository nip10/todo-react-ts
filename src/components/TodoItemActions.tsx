import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTimes,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  removeTodoDb,
  removeTodoLocal,
  toggleTodoLocal,
  toggleTodoDb,
  editTodoDb,
  editTodoLocal
} from "../actions/todo";

interface ITodoItemActionsProps {
  id: string;
  isEditing: boolean;
  isAuthenticated: boolean;
  textInput?: string;
  removeTodoDb: (id: string) => void;
  removeTodoLocal: (id: string) => void;
  toggleTodoDb: (id: string) => void;
  toggleTodoLocal: (id: string) => void;
  toggleIsEditing: (isEditing: boolean) => void;
  editTodoDb: (id: string, text: string) => void;
  editTodoLocal: (id: string, text: string) => void;
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
    if (props.isAuthenticated) {
      props.toggleTodoDb(props.id);
    } else {
      props.toggleTodoLocal(props.id);
    }
  };

  const removeTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (props.isAuthenticated) {
      props.removeTodoDb(props.id);
    } else {
      props.removeTodoLocal(props.id);
    }
  };

  const editTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const updatedTodoText = props.textInput;
    if (updatedTodoText && updatedTodoText.trim().length > 0) {
      if (props.isAuthenticated) {
        props.editTodoDb(props.id, updatedTodoText);
      } else {
        props.editTodoLocal(props.id, updatedTodoText);
      }
    }
    props.toggleIsEditing(false);
  };

  const renderEditAndRemoveButtons = () => (
    <Wrapper>
      <IconWrapper onClick={e => props.toggleIsEditing(true)}>
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
      <IconWrapper onClick={e => props.toggleIsEditing(false)}>
        <FontAwesomeIcon icon={faTimes} color="red" />
      </IconWrapper>
    </Wrapper>
  );

  return props.isEditing
    ? renderSaveAndCancelButtons()
    : renderEditAndRemoveButtons();
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, null, Action>) => ({
  removeTodoDb: (id: string) => dispatch(removeTodoDb(id)),
  removeTodoLocal: (id: string) => dispatch(removeTodoLocal(id)),
  toggleTodoDb: (id: string) => dispatch(toggleTodoDb(id)),
  toggleTodoLocal: (id: string) => dispatch(toggleTodoLocal(id)),
  editTodoDb: (id: string, text: string) => dispatch(editTodoDb(id, text)),
  editTodoLocal: (id: string, text: string) => dispatch(editTodoLocal(id, text))
});

const mapStateToProps = ({ auth }: any) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemActions);
