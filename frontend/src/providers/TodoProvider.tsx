import { createContext, useState } from "react";
import { TodoType } from "../types/TodoType";

export interface TodosContextType {
  alertChange: boolean;
  setAlertChange: React.Dispatch<React.SetStateAction<boolean>>;
  todosList: TodoType[];
  setTodosList: React.Dispatch<React.SetStateAction<TodoType[]>>;
  showDescription: [boolean, TodoType];
  setShowDescription: React.Dispatch<React.SetStateAction<[boolean, TodoType]>>;
}

export const TodosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

export default function TodosProvider({ children }: any) {
  const [todosList, setTodosList] = useState<TodoType[]>([]);
  const [showDescription, setShowDescription] = useState<[boolean, TodoType]>([
    false,
    {} as TodoType,
  ]);
  const [alertChange, setAlertChange] = useState<boolean>(false);

  return (
    <TodosContext.Provider
      value={{
        todosList,
        setTodosList,
        showDescription,
        setShowDescription,
        alertChange,
        setAlertChange,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
