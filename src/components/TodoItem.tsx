import * as React from 'react';
import styled from 'styled-components';
import TodoItemActions from './TodoItemActions';

interface ITodoItemProps {
  text: string,
  id: number,
  remove: (todoId: number) => void,
  edit: (todoId: number, todoText: string) => void,
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
`;

const TodoText = styled.p`
  margin: 0;
`;

export default class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      isEditing: false,
    }
    this.textInput = React.createRef();
  }

  private textInput: React.RefObject<HTMLInputElement>;

  private toggleIsEditing = () => {
    this.setState({ isEditing: !this.state.isEditing });
  }

  private onSubmitHandler = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const todoRef = this.textInput.current;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      this.props.edit(this.props.id, todoRef.value);
      todoRef.value = '';
    }
    this.toggleIsEditing();
  }

  private renderEditingTodo = () => (
    <Wrapper>
      <form onSubmit={this.onSubmitHandler}>
        <input type="text" defaultValue={this.props.text} ref={this.textInput} autoFocus={true} />
      </form>
      <TodoItemActions
        id={this.props.id}
        removeTodo={this.props.remove}
        editTodo={this.props.edit}
        isEditing={this.state.isEditing}
        toggleIsEditing={this.toggleIsEditing}
        textInput={this.textInput}
      />
    </Wrapper>
  )

  private renderNormalTodo = () => (
    <Wrapper>
      <TodoText>
        {this.props.text}
      </TodoText>
      <TodoItemActions
        id={this.props.id}
        removeTodo={this.props.remove}
        editTodo={this.props.edit}
        isEditing={this.state.isEditing}
        toggleIsEditing={this.toggleIsEditing}
        textInput={this.textInput}
      />
    </Wrapper>
  )

  public render() {
    const { isEditing } = this.state;
    return isEditing ? this.renderEditingTodo() : this.renderNormalTodo();
  }
}