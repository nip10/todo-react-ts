import * as React from 'react';
import styled from 'styled-components';
import TodoItemActions from './TodoItemActions';

interface ITodoItemProps {
  title: string,
  id: number,
  remove: (todoId: number) => void
}

const Wrapper = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid #e6e6e6;
  display: inline-block;
  width: 100%;
  text-align: justify;
`;

const TodoTitle = styled.p`
  margin: 0;
`;

const TodoItem = (props: ITodoItemProps) => (
  <Wrapper>
    <TodoTitle>
      {props.title}
    </TodoTitle>
    <TodoItemActions id={props.id} removeTodo={props.remove} />
  </Wrapper>
);

export default TodoItem;