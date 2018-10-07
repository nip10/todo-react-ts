import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCheck, faSave } from '@fortawesome/free-solid-svg-icons'
import { deleteTodo, toggleTodo, editTodo } from './../store/actions/todo';

const Wrapper = styled.div`
  float: right;
`;

const IconWrapper = styled.span`
  margin-right: 0.5em;
  cursor: pointer;
`;

const TodoItemActions = (props: any) => {

  const deleteTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const { dDeleteTodo, id } = props;
    dDeleteTodo(id);
  }

  const toggleTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const { dToggleTodo, id } = props;
    dToggleTodo(id);
  }

  const editTodoHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const { dEditTodo, toggleIsEditing, textInput, id, text } = props;
    const todoRef = textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      if (text !== todoRef.value) {
        dEditTodo(id, todoRef.value);
      }
      todoRef.value = '';
    }
    toggleIsEditing();
  }

  const renderEditAndDeleteButtons = () => {
    const { toggleIsEditing } = props;
    return (
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
  }

  const renderSaveAndCancelButtons = () => {
    const { toggleIsEditing } = props;
    return (
      <Wrapper>
        <IconWrapper onClick={editTodoHandler}>
          <FontAwesomeIcon icon={faSave} color="grey" />
        </IconWrapper>
        <IconWrapper onClick={toggleIsEditing}>
          <FontAwesomeIcon icon={faTimes} color="red" />
        </IconWrapper>
      </Wrapper>
    )
  }

  return props.isEditing ? renderSaveAndCancelButtons() : renderEditAndDeleteButtons();
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dEditTodo: (id: number, text: string) => {
      dispatch(editTodo(id, text))
    },
    dDeleteTodo: (id: number) => {
      dispatch(deleteTodo(id))
    },
    dToggleTodo: (id: number) => {
      dispatch(toggleTodo(id))
    }
  };
};

export default connect(null, mapDispatchToProps)(TodoItemActions);