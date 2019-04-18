import React, { Fragment } from "react";

import TodoList from "../components/TodoList";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";

const Home = () => (
  <Fragment>
    <Header />
    <AddTodo />
    <TodoList />
  </Fragment>
);

export default Home;
