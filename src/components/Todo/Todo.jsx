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
  const url = "https://www.pre-onboarding-selection-task.shop";
  const { todoValue, setTodoValue, todos, setTodos } = useContext(TodoContext);
  const access_token = localStorage.getItem("token");

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        `${url}/todos`,
        {
          todo: todoValue,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const todosData = response.data;
      setTodos((prev) => [...prev, todosData]);
      setTodoValue("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper>
      <Input type="text" value={todoValue} onChange={(e) => setTodoValue(e.target.value)} data="new-todo-input" placeholder="할 일을 입력하세요"></Input>
      <Button data="new-todo-add-button" event={handleAddTodo}>
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
  const url = "https://www.pre-onboarding-selection-task.shop";
  const access_token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${url}/todos`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((v, i) => {
        return (
          <TodoItem id={v.id} key={v.id} editMode={v.id === edit} completed={v.isCompleted}>
            {v.todo}
          </TodoItem>
        );
      })}
    </ul>
  );
};

const TodoItem = ({ children, completed, id, editMode }) => {
  const { todos, setTodos, edit, setEdit } = useContext(TodoContext);
  const url = "https://www.pre-onboarding-selection-task.shop";
  const access_token = localStorage.getItem("token");
  const handleCheckboxChange = async (todoId, todo, isCompleted) => {
    console.log(isCompleted, typeof isCompleted);
    try {
      const response = await axios.put(
        `${url}/todos/${todoId}`,
        {
          todo: todo,
          isCompleted: isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, todo: response.data.todo, isCompleted: response.data.isCompleted };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const access_token = localStorage.getItem("token");
    try {
      await axios.delete(`${url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const response = await axios.get(`${url}/todos`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleEditChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleEditSubmit = async (id, inputValue, completed) => {
    const access_token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${url}/todos/${id}`,
        { todo: inputValue, isCompleted: completed },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, todo: response.data.todo, isCompleted: response.data.isCompleted };
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
              <input type="checkbox" checked={completed} onChange={(e) => handleCheckboxChange(id, children, e.target.checked)} />
              <span>{children}</span>
            </label>
            <Button size="small" data="modify-button" event={() => handleEdit(id)}>
              수정
            </Button>
            <Button size="small" data="delete-button" event={() => handleDelete(id)}>
              삭제
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignContent: "center" }}>
            <label style={{ flex: "1 1 auto", display: "flex", gap: "10px" }}>
              <input type="checkbox" checked={completed} onChange={(e) => handleCheckboxChange(id, children, e.target.checked)} />
              <input data-testid="modify-input" defaultValue={children} onChange={handleEditChange} />
            </label>
            <Button size="small" data="submit-Button" event={() => handleEditSubmit(id, inputValue, completed)}>
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
