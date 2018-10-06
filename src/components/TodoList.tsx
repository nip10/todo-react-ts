import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

import styled from 'styled-components';

const TodoListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: 1px solid #e6e6e6;
`;

const TodoList = ({ todos }: any) => {
  if (todos && todos.length > 0) {
    return <TodoListWrapper>
      {todos.map((todo: any, index: any) => (
        <TodoItem
          key={index}
          {...todo}
        />)
      )}
    </TodoListWrapper>
  } else {
    return <p> Add your first todo</p>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList);