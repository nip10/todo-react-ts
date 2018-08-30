import * as React from 'react';

interface ITodo {
  // id: number,
  title: string,
  completed: boolean,
}

interface IAddTodoProps {
  add: (newTodo: ITodo) => void
}

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
        <input type="text" ref={textInput} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo;