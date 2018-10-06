import React from 'react';
import styled from 'styled-components';
import TodoItemActions from './TodoItemActions';

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

const TodoItem = ({ text, id }: any) => {
  return (
    <Wrapper>
      <TodoText >
        {text}
      </TodoText>
      <TodoItemActions id={id} />
    </Wrapper>
  )
};

export default TodoItem;