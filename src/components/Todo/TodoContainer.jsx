import React from "react";
import Container from "../common/Container";
import { Todo } from "./Todo";

const TodoContainer = () => {
  return (
    <Todo>
      <Container gap={2} position="start">
        <Todo.Heading>ToDo List</Todo.Heading>
        <Todo.Create />
        <Todo.List />
      </Container>
    </Todo>
  );
};

export default TodoContainer;
