import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoItemActions from './TodoItemActions';
import { ITodo } from './../types/todo';
import { editTodo } from './../store/actions/todo';

interface ITodoItemWrapperProps {
  completed?: boolean,
}

interface ITodoItemState {
  isEditing: boolean,
}

interface ITodoItemProps extends ITodo {
  dEditTodo: (id: number, text: string) => void,
}

const Wrapper = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid #e6e6e6;
  display: inline-block;
  width: 100%;
  text-align: justify;
  /* There's no need to select the icons because they are svg's which are not affected by text-decoration */
  > :not(span) {
    text-decoration: ${(props: ITodoItemWrapperProps) => props.completed ? 'line-through' : 'none'};
    opacity: ${(props: ITodoItemWrapperProps) => props.completed ? '0.7' : '1'};
  }
`;

const TodoText = styled.p`
  margin: 0;
`;

const TodoTimestamp = styled.span`
  font-size: 0.7em;
  color: rgba(0, 0, 0, 0.6);
`;

class TodoItem extends Component<ITodoItemProps, ITodoItemState> {
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
    const { dEditTodo, id, text } = this.props;
    if (todoRef) {
      if (!todoRef.value.trim()) {
        return;
      }
      if (text !== todoRef.value) {
        dEditTodo(id, todoRef.value);
      }
      todoRef.value = '';
    }
    this.toggleIsEditing();
  }

  /**
   * Render the timestamp of the creation/update of the todo
   *
   * @private
   * @memberof TodoItem
   * @return React Element
   */
  private renderTimestamp = () => {
    let timestampMessage;
    const { createdAt, updatedAt } = this.props;
    if (updatedAt) {
      timestampMessage = `${updatedAt} - edited`;
    } else {
      timestampMessage = createdAt;
    }
    return <TodoTimestamp>{timestampMessage}</TodoTimestamp>
  }

  /**
   * Render for editing mode
   *
   * @private
   * @memberof TodoItem
   */
  private renderEditingTodo = () => {
    const { id, text } = this.props;
    return (
      <Wrapper>
        <form onSubmit={this.onSubmitHandler}>
          <input type="text" defaultValue={text} ref={this.textInput} autoFocus={true} />
        </form>
        <TodoItemActions
          id={id}
          text={text}
          isEditing={this.state.isEditing}
          toggleIsEditing={this.toggleIsEditing}
          textInput={this.textInput}
        />
      </Wrapper>
    )
  }

  /**
   * Render for normal mode
   *
   * @private
   * @memberof TodoItem
   */
  private renderNormalTodo = () => {
    const { id, text, completed } = this.props;
    return (
      <Wrapper completed={completed}>
        <TodoText >
          {text}
        </TodoText>
        {this.renderTimestamp()}
        <TodoItemActions
          id={id}
          isEditing={this.state.isEditing}
          toggleIsEditing={this.toggleIsEditing}
        />
      </Wrapper>
    )
  }

  public render() {
    const { isEditing } = this.state;
    return isEditing ? this.renderEditingTodo() : this.renderNormalTodo();
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dEditTodo: (id: number, text: string) => {
      dispatch(editTodo(id, text))
    }
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);