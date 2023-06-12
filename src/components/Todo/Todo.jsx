import React, { createContext, useContext, useEffect, useState } from "react";
import Layout from "../common/Layout";
import Heading from "../common/Heading";
import Input from "../common/Input";
import Button from "../common/Button";
import Form from "../common/Form";
import styled from "@emotion/styled";
import axios from "axios";

const TodoContext = createContext();

export const Todo = ({ children }) => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const providerValue = {
    todoValue,
    setTodoValue,
    todos,
    setTodos,
    edit,
    setEdit,
  };
  return (
    <TodoContext.Provider value={{ ...providerValue }}>
      <Base>{children}</Base>
    </TodoContext.Provider>
  );
};

const Base = styled.div`
  padding: 2rem;
`;

const TodoHeading = ({ children }) => {
  return <Heading>{children}</Heading>;
};

const CreateTodo = () => {
  const url = "http://localhost:3030";
  const { todoValue, setTodoValue, todos, setTodos } = useContext(TodoContext);

  const handleAddTodo = async (length) => {
    try {
      const response = await axios.post(`${url}/todos`, { todoValue, length });
      const todos = response.data;
      setTodos(todos);
      setTodoValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Input type="text" value={todoValue} onChange={(e) => setTodoValue(e.target.value)} data="new-todo-input" placeholder="할 일을 입력하세요"></Input>
      <Button data="new-todo-add-button" event={() => handleAddTodo(todos.length)}>
        추가
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const TodoList = () => {
  const { todos, setTodos, edit } = useContext(TodoContext);
  const url = "http://localhost:3030";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${url}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo, i) => {
        return (
          <TodoItem order={i} id={todo.id} key={todo.id} editMode={i === edit} completed={todo.isCompleted}>
            {todo.todo}
          </TodoItem>
        );
      })}
    </ul>
  );
};

const TodoItem = ({ children, completed, id, order, editMode }) => {
  const { todos, setTodos, edit, setEdit } = useContext(TodoContext);
  const url = "http://localhost:3030";
  const handleCheckboxChange = async (todoId, isCompleted) => {
    console.log(todoId);
    try {
      const response = await axios.put(`${url}/todos/done/${todoId}`, { isCompleted });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, isCompleted: response.data.isCompleted };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/todos/${id}`, { id });
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleEditChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = (order) => {
    setEdit(order);
  };

  const handleEditSubmit = async (id, inputValue) => {
    try {
      const response = await axios.put(`${url}/todos/edit/${id}`, { todo: inputValue });
      console.log(response.data);
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, todo: response.data.todo };
          }
          return todo;
        });
      });
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ItemWrapper>
      <li>
        {!editMode ? (
          <div style={{ display: "flex", alignContent: "center" }}>
            <label style={{ flex: "1 1 auto", display: "flex", gap: "10px" }}>
              <input type="checkbox" checked={completed} onChange={(e) => handleCheckboxChange(id, e.target.checked)} />
              <span>{children}</span>
            </label>
            <Button size="small" data="modify-button" event={() => handleEdit(order)}>
              수정
            </Button>
            <Button size="small" data="delete-button" event={handleDelete}>
              삭제
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignContent: "center" }}>
            <label style={{ flex: "1 1 auto", display: "flex", gap: "10px" }}>
              <input type="checkbox" checked={completed} onChange={(e) => handleCheckboxChange(id, e.target.checked)} />
              <input data-testid="modify-input" defaultValue={children} onChange={handleEditChange} />
            </label>
            <Button size="small" data="submit-Button" event={() => handleEditSubmit(id, inputValue)}>
              제출
            </Button>
            <Button size="small" data="cancel-Button" event={() => setEdit(false)}>
              취소
            </Button>
          </div>
        )}
      </li>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  padding: 10px;
  min-width: 500px;

  li {
    list-style: none;
  }
  button {
    margin-left: 1rem;
  }
`;

Todo.Heading = TodoHeading;
Todo.Create = CreateTodo;
Todo.List = TodoList;
