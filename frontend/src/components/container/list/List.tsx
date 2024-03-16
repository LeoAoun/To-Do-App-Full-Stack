import "./List.css";
import { useContext } from "react";
import {
  TodosContext,
  TodosContextType,
} from "../../../providers/TodoProvider";

import { PRIORITY } from "../../../enums/PriorityEnum";
import { PRIORITY_COLOR } from "../../../enums/PriorityEnum";

import { handleCheck, deleteTodo } from "../../../CRUD functions/CRUDFunctions";
import { TodoType } from "../../../types/TodoType";

const trashImg = require("../../../images/trash.png");

export default function List() {
  const { todosList, setTodosList, setShowDescription, setAlertChange } =
    useContext<TodosContextType>(TodosContext);

  function showDescriptionComponent(
    event: React.MouseEvent<HTMLElement>,
    todo: TodoType
  ) {
    if (event.target === event.currentTarget) {
      setShowDescription([true, todo]);
    }
  }
  return (
    <ul className="list">
      {todosList &&
        todosList.length > 0 &&
        todosList.map((todo: any) => (
          <li key={todo.id} onClick={(e) => showDescriptionComponent(e, todo)}>
            <input
              onChange={() => handleCheck(todo, setAlertChange)}
              checked={todo.completed}
              type="checkbox"
              className="checkbox"
            />
            <span
              className="title"
              onClick={(e) => showDescriptionComponent(e, todo)}
            >
              {todo.title}
            </span>
            <span
              className="priority"
              onClick={(e) => showDescriptionComponent(e, todo)}
              style={{
                backgroundColor:
                  todo.priority === PRIORITY.HIGH
                    ? PRIORITY_COLOR.HIGH
                    : todo.priority === PRIORITY.MEDIUM
                    ? PRIORITY_COLOR.MEDIUM
                    : PRIORITY_COLOR.LOW,
              }}
            >
              {todo.priority}
            </span>
            <div>
              <img
                onClick={() =>
                  deleteTodo(todo, setTodosList, todosList, setAlertChange)
                }
                className="delete"
                src={trashImg}
                alt="Delete"
              />
            </div>
          </li>
        ))}
    </ul>
  );
}
