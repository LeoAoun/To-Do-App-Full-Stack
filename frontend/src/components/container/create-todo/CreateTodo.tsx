import "./CreateTodo.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  TodosContext,
  TodosContextType,
} from "../../../providers/TodoProvider";

import { userId } from "../../login/Login";

import { createTodo } from "../../../CRUD functions/CRUDFunctions";
import { PRIORITY } from "../../../enums/PriorityEnum";
import { TodoTypeDTO } from "../../../types/TodoType";

export default function CreateTodo() {
  const { alertChange, setAlertChange } =
    useContext<TodosContextType>(TodosContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [todoData, setTodoData] = useState<TodoTypeDTO>({
    title: "",
    description: "",
    completed: false,
    priority: "" as PRIORITY,
    userId: userId,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  // Change the state of the 'showComponent' variable according to the 'createtodocomponent' parameter in the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const createTodoComponent = searchParams.get("createtodocomponent");

    if (createTodoComponent === "true") setShowComponent(true);
    
    else {
      const input = document.querySelector('input[name="title"]') as HTMLInputElement;
      const select = document.querySelector('select[name="priority"]') as HTMLInputElement;
      const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;

      if (input && select && textarea) {
        input.value = "";
        select.value = "";
        textarea.value = "";

        setTodoData({
          title: "",
          description: "",
          completed: false,
          priority: "" as PRIORITY,
          userId: userId,
        });
      }
      setShowComponent(false);
    }
  }, [location.search]);

  // Function to hide the CreateTodoComponent
  function hideCreateTodoComponent(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("createtodocomponent", "false");
      navigate({ search: `? ${newSearchParams.toString()}` });
    }
  }

  return (
    <>
      <div
        onClick={hideCreateTodoComponent}
        style={{
          display: `${showComponent === false ? "none" : "flex"}`,
        }}
        className="background-add-container"
      >
        <div className="add-container">
          <input
            name="title"
            value={todoData.title}
            onChange={handleInputChange}
            placeholder="Todo"
            type="text"
          />

          <select
            name="priority"
            value={todoData.priority}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              PRIORITY
            </option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <textarea
            onChange={handleInputChange}
            name="description"
            value={todoData.description}
            cols={30}
            rows={3}
            placeholder="Description..."
          ></textarea>

          <button
            onClick={(event) =>
              createTodo(
                event,
                todoData,
                alertChange,
                setAlertChange,
                location,
                navigate
              )
            }
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
}
