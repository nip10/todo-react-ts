import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "./../theme/index";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { addTodoDb, addTodoLocal } from "../actions/todo";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid ${colors.backgroundColor};
  width: 82%;
  @media (max-width: 576px) {
    display: block;
    width: calc(100% - 2em);
  }
`;

const Button = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid black;
  width: 11%;
  background-color: ${colors.backgroundColor};
  color: white;
  cursor: pointer;
  @media (max-width: 576px) {
    display: block;
    width: calc(100% - 1em);
  }
`;

const Form = styled.form`
  padding: 1em 0;
`;

const AddTodo = ({ addTodoDb, addTodoLocal, isAuthenticated }: any) => {
  const [todo, setTodo] = useState("");

  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (isAuthenticated) {
      addTodoDb(todo);
    } else {
      addTodoLocal(todo);
    }
    setTodo("");
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        type="text"
        placeholder="Task"
        required
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <Button type="submit">Add Todo</Button>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, null, Action>) => ({
  addTodoDb: (todo: string) => dispatch(addTodoDb(todo)),
  addTodoLocal: (todo: string) => dispatch(addTodoLocal(todo))
});

const mapStateToProps = ({ auth }: any) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
