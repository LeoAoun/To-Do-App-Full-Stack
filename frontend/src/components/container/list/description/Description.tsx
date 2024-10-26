import "./Description.css";

import { useContext } from "react";
import {
  TodosContext,
  TodosContextType,
} from "../../../../providers/TodoProvider";
import { TodoType } from "../../../../types/TodoType";
import { PRIORITY, PRIORITY_COLOR } from "../../../../enums/PriorityEnum";

export default function Description() {
  const { showDescription, setShowDescription } =
    useContext<TodosContextType>(TodosContext);

  // Function to hide the DescriptionComponent
  function hideDescriptionComponent(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setShowDescription([false, {} as TodoType]);
    }
  }

  return (
    <>
      <div
        className="background-description"
        style={{ display: showDescription[0] ? "block" : "none" }}
      >
        <div className="description-container">
          <div className="title-close">
            <span className="title">{showDescription[1].title}</span>
            <button onClick={hideDescriptionComponent}>X</button>
          </div>
          <span className="description">{showDescription[1].description}</span>
          <span
            className="priority"
            style={{
              backgroundColor:
                showDescription[1].priority === PRIORITY.HIGH
                  ? PRIORITY_COLOR.HIGH
                  : showDescription[1].priority === PRIORITY.MEDIUM
                  ? PRIORITY_COLOR.MEDIUM
                  : PRIORITY_COLOR.LOW,
            }}
          >
            {showDescription[1].priority}
          </span>
        </div>
      </div>
    </>
  );
}
