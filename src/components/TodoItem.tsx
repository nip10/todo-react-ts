import React, { useState, useRef } from "react";
import styled from "styled-components";
import TodoItemActions from "./TodoItemActions";
import { ITodo } from "./../types/todo";

interface ITodoItemProps extends ITodo {
  // removeTodo: (todoId: number) => void;
  // editTodo: (todoId: number, text: string) => void;
  // toggleTodo: (todoId: number) => void;
}

interface ITodoItemWrapperProps {
  completed?: boolean;
}

interface ITodoItemState {
  isEditing: boolean;
}

const Wrapper = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid #e6e6e6;
  display: inline-block;
  width: 100%;
  text-align: justify;
  /* There's no need to select the icons because they are svg's which are not affected by text-decoration */
  > :not(span) {
    text-decoration: ${(props: ITodoItemWrapperProps) =>
      props.completed ? "line-through" : "none"};
    opacity: ${(props: ITodoItemWrapperProps) =>
      props.completed ? "0.7" : "1"};
  }
`;

const TodoText = styled.p`
  margin: 0;
`;

const TodoTimestamp = styled.span`
  font-size: 0.7em;
  color: rgba(0, 0, 0, 0.6);
`;

const TodoItem = (props: ITodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(props.text);
  // const todoTextInput = useRef(null);

  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (todoText.trim().length > 0) {
      // props.editTodo(props.id, todoText);
      // setTodoText("");  // Not sure this is required
      // return;
    }
    setIsEditing(false);
  };

  const renderTimestamp = () => {
    const { updatedAt, createdAt } = props;
    let timestampMessage;
    if (updatedAt && updatedAt.length > 0) {
      timestampMessage = updatedAt + " - edited";
    } else {
      timestampMessage = createdAt;
    }
    return <TodoTimestamp>{timestampMessage}</TodoTimestamp>;
  };

  const renderEditingTodo = () => (
    <Wrapper>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          defaultValue={props.text}
          onChange={e => setTodoText(e.target.value)}
          autoFocus={true}
        />
      </form>
      <TodoItemActions
        id={props.id}
        // removeTodo={props.removeTodo}
        // editTodo={props.editTodo}
        isEditing={isEditing}
        toggleIsEditing={setIsEditing}
        textInput={todoText}
      />
    </Wrapper>
  );

  const renderNormalTodo = () => (
    <Wrapper completed={props.completed}>
      <TodoText>{props.text}</TodoText>
      {renderTimestamp()}
      <TodoItemActions
        id={props.id}
        // removeTodo={props.removeTodo}
        // editTodo={props.editTodo}
        isEditing={isEditing}
        toggleIsEditing={setIsEditing}
        // toggleTodo={props.toggleTodo}
      />
    </Wrapper>
  );

  return isEditing ? renderEditingTodo() : renderNormalTodo();
};

export default TodoItem;
