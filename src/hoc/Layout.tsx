import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import GithubCorner from "react-github-corner";
import { colors } from "./../theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.backgroundColor};
    font-family: 'Roboto', sans-serif;
  }
`;

const Wrapper = styled.div`
  margin: 2em auto;
  max-width: 900px;
  background-color: white;
  padding: 1em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  text-align: center;
`;

const Layout = (props: any) => (
  <Wrapper>
    <GlobalStyle />
    <GithubCorner href="https://github.com/nip10/todo-react-ts" />
    <Title>Todo App</Title>
    {props.children}
  </Wrapper>
);

export default Layout;
