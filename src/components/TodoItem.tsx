import React, { Component } from 'react';
import styled from 'styled-components';
import TodoItemActions from './TodoItemActions';
import { ITodo } from './../types/todo';

interface ITodoItemProps extends ITodo {
  removeTodo: (todoId: number) => void,
  editTodo: (todoId: number, todoText: string) => void,
  toggleTodo: (todoId: number) => void,
}

interface ITodoItemWrapperProps {
  completed?: boolean,
}

interface ITodoItemState {
  isEditing: boolean,
}

const Wrapper = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid #e6e6e6;
  display: inline-block;
  width: 100%;
  text-align: justify;
  text-decoration: ${(props: ITodoItemWrapperProps) => props.completed ? 'line-through' : 'none'};
  opacity: ${(props: ITodoItemWrapperProps) => props.completed ? '0.7' : '1'};
`;

const TodoText = styled.p`
  margin: 0;
`;

export default class TodoItem extends Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      isEditing: false,
    }
    this.textInput = React.createRef();
  }

  private textInput: React.RefObject<HTMLInputElement>;

  private toggleIsEditing = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  private onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const todoRef = this.textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      this.props.editTodo(this.props.id, todoRef.value);
      todoRef.value = '';
    }
    this.toggleIsEditing();
  }

  /**
   * Render for editing mode
   *
   * @private
   * @memberof TodoItem
   */
  private renderEditingTodo = () => (
    <Wrapper>
      <form onSubmit={this.onSubmitHandler}>
        <input type="text" defaultValue={this.props.text} ref={this.textInput} autoFocus={true} />
      </form>
      <TodoItemActions
        id={this.props.id}
        removeTodo={this.props.removeTodo}
        editTodo={this.props.editTodo}
        isEditing={this.state.isEditing}
        toggleIsEditing={this.toggleIsEditing}
        textInput={this.textInput}
      />
    </Wrapper>
  )

  /**
   * Render for normal mode
   *
   * @private
   * @memberof TodoItem
   */
  private renderNormalTodo = () => (
    <Wrapper completed={this.props.completed}>
      <TodoText>
        {this.props.text}
      </TodoText>
      <TodoItemActions
        id={this.props.id}
        removeTodo={this.props.removeTodo}
        editTodo={this.props.editTodo}
        isEditing={this.state.isEditing}
        toggleIsEditing={this.toggleIsEditing}
        toggleTodo={this.props.toggleTodo}
      />
    </Wrapper>
  )

  public render() {
    const { isEditing } = this.state;
    return isEditing ? this.renderEditingTodo() : this.renderNormalTodo();
  }
}