import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addTodo } from './../store/actions/todo';
import { colors } from './../theme';

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

const AddTodo = (props: any) => {

  const textInput: React.RefObject<HTMLInputElement> = React.createRef();

  /**
   * Submit form handler. Get the value from the input element and pass it to the add prop function.
   *
   * @param {React.FormEvent<EventTarget>} e
   * @returns {void}
   */
  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const { dAddTodo } = props;
    const todoRef = textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      dAddTodo(todoRef.value);
      todoRef.value = '';
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input type="text" placeholder="Task" innerRef={textInput} />
      <Button type="submit">
        Add Todo
      </Button>
    </Form>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dAddTodo: (text: string) => {
      dispatch(addTodo(text))
    }
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);