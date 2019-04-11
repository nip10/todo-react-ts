import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "./../theme/index";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { addTodo } from "../actions/todo";

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

const AddTodo = ({ addTodo }: { addTodo: any }) => {
  const [todo, setTodo] = useState("");

  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log("Todo:", todo);
    addTodo(todo);
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        type="text"
        placeholder="Task"
        required
        onChange={e => setTodo(e.target.value)}
      />
      <Button type="submit">Add Todo</Button>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, null, Action>) => ({
  addTodo: (todo: string) => dispatch(addTodo(todo))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);
