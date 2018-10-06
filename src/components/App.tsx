import GithubCorner from 'react-github-corner';
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import TodoList from './TodoList';
import Header from './Header';
import AddTodo from './AddTodo';
import { colors } from '../theme';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  background-color: ${colors.backgroundColor};
  font-family: 'Roboto', sans-serif;
}`

const Wrapper = styled.div`
  margin: 2em auto;
  max-width: 900px;
  background-color: white;
  padding: 1em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
`;

const App = () => {
  return (
    <Wrapper>
      <Header />
      <AddTodo />
      <TodoList />
      <GithubCorner href='https://github.com/nip10/todo-react-ts' />
    </Wrapper>
  );
};

export default App;
