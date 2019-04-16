import React, { useState } from "react";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import { colors } from "../theme/index";
import { register } from "../actions/auth";

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

const Register = ({ register }: { register: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    register(email, password);
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, null, Action>) => ({
  register: (email: string, password: string) =>
    dispatch(register(email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
