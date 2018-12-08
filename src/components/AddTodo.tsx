import React from 'react';
import styled from 'styled-components';
import { colors } from './../theme/index';

interface IAddTodoProps {
  addTodo: (text: string) => void
}

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

const AddTodo: React.SFC<IAddTodoProps> = props => {

  const textInput: React.RefObject<HTMLInputElement> = React.createRef();

  /**
   * Submit form handler. Get the value from the input element and pass it to the add prop function.
   *
   * @param {React.FormEvent<EventTarget>} e
   * @returns {void}
   */
  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const todoRef = textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      props.addTodo(todoRef.value);
      todoRef.value = '';
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      {/* the following weird ref line with 'as any' is caused by styled component's bad ts typings
      check here https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884 */}
      <Input type="text" placeholder="Task" ref={textInput as any} />
      <Button type="submit">
        Add Todo
      </Button>
    </Form>
  )
}

export default AddTodo;