import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { ITodo } from "./../types/todo";

interface ITodoListProps {
  todos: ITodo[];
}

const TodoListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: 1px solid #e6e6e6;
`;

const TodoList = ({ todos }: ITodoListProps) => {
  const renderTodoItems = (todos: ITodo[]) => {
    return (
      <TodoListWrapper>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            {...todo}
            // removeTodo={this.props.removeTodo}
            // editTodo={this.props.editTodo}
            // toggleTodo={this.props.toggleTodo}
          />
        ))}
      </TodoListWrapper>
    );
  };

  if (todos && todos.length > 0) {
    return renderTodoItems(todos);
  } else {
    return <p> Add your first todo! </p>;
  }
};

const mapStateToProps = ({ todos }: any) => ({
  todos: todos.items
});

export default connect(mapStateToProps)(TodoList);
