import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/index';

interface ITodo {
  text: string,
  completed: boolean,
}

interface IAddTodoProps {
  addTodo: (newTodo: ITodo) => void
}

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid ${colors.backgroundColor};
  width: 82%;
`;

const Button = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid black;
  width: 11%;
  background-color: ${colors.backgroundColor};
  color: white;
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
      props.addTodo({
        completed: false,
        text: todoRef.value,
      });
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

export default AddTodo;