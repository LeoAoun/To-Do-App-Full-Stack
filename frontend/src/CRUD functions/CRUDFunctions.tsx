import React from "react";
import axios from "axios";

import { toast } from "sonner";

import { token } from "../components/login/Login";
import { userId } from "../components/login/Login";

import { TodoType, TodoTypeDTO } from "../types/TodoType";
import { FILTER, ORDER } from "../enums/SortTypeEnum";

import { sort } from "../components/container/SortFunction";
import { Location, NavigateFunction } from "react-router-dom";

const apiUrl = "http://localhost:4000";

// Function to get all todos from the user in the database and sort them according to the 'filter' and 'order' parameters
function getTodos(
  filter: FILTER,
  order: ORDER,
  setTodosList: React.Dispatch<React.SetStateAction<TodoType[]>>
) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.get(`${apiUrl}/todo/user/${userId}`).then((response) => {
    const sortedList = sort(filter, order, response.data);
    setTodosList(sortedList);
  });
}

// Function to create a new todo in the database and update the todos list
const createTodo = async (
  event: any,
  todoData: TodoTypeDTO,
  alertChange: boolean,
  setAlertChange: React.Dispatch<boolean>,
  location: Location,
  navigate: NavigateFunction
) => {
  event.preventDefault();
  try {
    await axios.post(`${apiUrl}/todo`, todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("createtodocomponent", "false");
    navigate({ search: "?" + newSearchParams.toString() });

    setAlertChange(!alertChange);
    toast.success("Todo created successfully");
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.statusText;
      toast.error(errorMessage);
    } else {
      toast.error("Error creating todo");
    }
  }
};

// Function to handle the checkbox of the todo item (completed or not) in the database and update the todos list
function handleCheck(
  todo: TodoType,
  setAlertChange: React.Dispatch<React.SetStateAction<boolean>>
) {
  let todoCompleted: boolean = todo.completed;
  todoCompleted = !todoCompleted;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .put(`${apiUrl}/todo/${todo.id}`, {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      completed: todoCompleted,
    })
    .then((response) => {
      setAlertChange((prevAlertChange) => !prevAlertChange);
    })
    .catch((error: any) => {
      toast.error("Error updating todo");
    });
}

// Function to delete a todo from the database by its id (todo.id) and update the todos list
function deleteTodo(
  todo: TodoType,
  setTodosList: React.Dispatch<React.SetStateAction<TodoType[]>>,
  todosList: TodoType[],
  setAlertChange: React.Dispatch<React.SetStateAction<boolean>>
) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .delete(`${apiUrl}/todo/delete/${todo.id}`)
    .then((response) => {
      const newTodosList = todosList.filter((t) => t.id !== todo.id);
      setTodosList(newTodosList);
      setAlertChange((prevAlertChange) => !prevAlertChange);
      toast.success("Todo deleted successfully");
    })
    .catch((error: any) => {
      toast.error("Error deleting todo");
    });
}

export { apiUrl, getTodos, createTodo, handleCheck, deleteTodo };
