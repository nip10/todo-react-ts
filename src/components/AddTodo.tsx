import * as React from 'react';
import styled from '../theme/index';

interface ITodo {
  // id: number,
  title: string,
  completed: boolean,
}

interface IAddTodoProps {
  add: (newTodo: ITodo) => void
}

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: 1px solid palevioletred;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: papayawhip;
  border: 1px solid palevioletred;
  border-radius: 3px;
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
      console.log(`Submited new todo: ${todoRef.value}`);
      props.add({
        completed: false,
        title: todoRef.value,
      });
      todoRef.value = '';
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Input type="text" innerRef={textInput} />
        <Button type="submit">
          Add Todo
        </Button>
      </form>
    </div>
  )
}

export default AddTodo;