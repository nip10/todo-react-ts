import * as React from 'react';

// interface IonAdd = (newTodo: ITodo) => void

// interface ITodo {
//   completed: boolean,
//   id: number,
//   title: string,
//   userId: number,
// }

// type IonAdd = ((newTodo: ITodo) => void)

const AddTodo = ({ onAdd }) => {

  const textInput: React.RefObject<HTMLInputElement> = React.createRef();

  const onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const todoRef = textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      console.log(`Submited new todo: ${todoRef.value}`);
      onAdd({
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