import "./Container.css";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TodosContext, TodosContextType } from "../../providers/TodoProvider";

import { FILTER } from "../../enums/SortTypeEnum";
import { ORDER } from "../../enums/SortTypeEnum";

import { getTodos } from "../../CRUD functions/CRUDFunctions";

import CreateTodo from "./create-todo/CreateTodo";
import Filter from "./filter/Filter";
import List from "./list/List";
import Description from "./list/description/Description";

export default function Todos() {
  const { setTodosList, alertChange } =
    useContext<TodosContextType>(TodosContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Get the todos list from the database and sort them according to the 'filter' and 'order' parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderParam = searchParams.get("order") as ORDER;
    const filterParam = searchParams.get("filter") as FILTER;
    getTodos(filterParam, orderParam, setTodosList);
  }, [location.search, alertChange, setTodosList]);

  // Verify if the 'createtodocomponent' parameter is present in the URL
  useEffect(() => {
    // If not, add it with the default value 'false'
    if (!new URLSearchParams(location.search).has("createtodocomponent")) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("createtodocomponent", "false");
      navigate({ search: "?" + newSearchParams.toString() });
    }
  }, [location.search, navigate]);

  // Verify if the 'filtercomponent' parameter is present in the URL
  useEffect(() => {
    // If not, add it with the default value 'false'
    if (!new URLSearchParams(location.search).has("filtercomponent")) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("filtercomponent", "false");
      navigate({ search: "?" + newSearchParams.toString() });
    }
  }, [location.search, navigate]);

  // Function to show the CreateTodoComponent
  function showCreateTodoComponent() {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("createtodocomponent", "true");
    navigate({ search: "?" + newSearchParams.toString() });
  }

  // Function to show the FilterComponent
  function showFilterComponent() {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("filtercomponent", "true");
    navigate({ search: "?" + newSearchParams.toString() });

    // Animation to show the FilterComponent
    const filterContainer = document.querySelector(".filters-container");
    if (filterContainer) {
      filterContainer.classList.add("animation-container-filters-in");
      filterContainer.classList.remove("animation-container-filters-out");
    }
  }

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button onClick={showCreateTodoComponent} className="add-button">
            +
          </button>

          <button onClick={showFilterComponent} className="filter-button">
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </button>
        </div>

        <List />
        <Filter />
        <CreateTodo />
        <Description />
      </div>
    </>
  );
}
