import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo } from "../store/actions/todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCheck, faSave } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  float: right;
`;

const IconWrapper = styled.span`
  margin-right: 0.5em;
  cursor: pointer;
`;

const TodoItemActions = ({ dispatch, id, toggleIsEditing, isEditing }: any) => {

  const deleteTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    dispatch(deleteTodo(id));
  }

  const toggleTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    dispatch(toggleTodo(id));
  }

  const renderEditAndDeleteButtons = () => (
    <Wrapper>
      <IconWrapper onClick={toggleIsEditing}>
        <FontAwesomeIcon icon={faPen} color="grey" />
      </IconWrapper>
      <IconWrapper onClick={deleteTodoHandler}>
        <FontAwesomeIcon icon={faTimes} color="red" />
      </IconWrapper>
      <IconWrapper onClick={toggleTodoHandler}>
        <FontAwesomeIcon icon={faCheck} color="green" />
      </IconWrapper>
    </Wrapper>
  )

  const renderSaveAndCancelButtons = () => (
    <Wrapper>
      {/* <IconWrapper onClick={editTodoHandler}>
        <FontAwesomeIcon icon={faSave} color="grey" />
      </IconWrapper> */}
      <IconWrapper onClick={toggleIsEditing}>
        <FontAwesomeIcon icon={faTimes} color="red" />
      </IconWrapper>
    </Wrapper>
  )

  return isEditing ? renderSaveAndCancelButtons() : renderEditAndDeleteButtons();

};

export default connect()(TodoItemActions);