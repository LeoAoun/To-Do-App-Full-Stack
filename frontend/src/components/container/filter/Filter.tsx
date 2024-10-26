import "./Filter.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ORDER, FILTER } from "../../../enums/SortTypeEnum";

import {
  TodosContext,
  TodosContextType,
} from "../../../providers/TodoProvider";

import { sort } from "../SortFunction";

export default function Filter() {
  const { todosList, setTodosList } =
    useContext<TodosContextType>(TodosContext);

  const arrayOfOrders = Object.values(ORDER);
  const arrayOfFilters = Object.values(FILTER);

  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<FILTER>(FILTER.DATE);
  const [order, setOrder] = useState<ORDER>(ORDER.ASC);

  // Function to hide the FilterComponent
  function HideFilterComponent() {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("filtercomponent", "false");
    navigate({ search: "?" + newSearchParams.toString() });

    const filterContainer = document.querySelector(".filters-container");
    if (filterContainer) {
      filterContainer.classList.remove("animation-container-filters-in");
      filterContainer.classList.add("animation-container-filters-out");
    }
  }

  // Verify if the 'order' and 'filter' parameters are present in the URL
  useEffect(() => {
    // If not, add them with the default values
    if (
      !new URLSearchParams(location.search).has("order") ||
      !new URLSearchParams(location.search).has("filter")
    ) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("order", order);
      newSearchParams.set("filter", filter);
      navigate({ search: "?" + newSearchParams.toString() });
    }
  }, [filter, location.search, navigate, order, setTodosList, todosList]);

  // Change the state of the 'order' variable according to the 'order' parameter in the URL
  function handleOrderClick(e: React.MouseEvent, orderSelected: ORDER) {
    setOrder(orderSelected);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("order", orderSelected);
    navigate(`?${newSearchParams.toString()}`);
    setTodosList(sort(filter, orderSelected, todosList));
  }

  // Change the state of the 'filter' variable according to the 'filter' parameter in the URL
  function handleFilterClick(e: React.MouseEvent, filterSelected: FILTER) {
    setFilter(filterSelected);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("filter", filterSelected);
    navigate(`?${newSearchParams.toString()}`);
    setTodosList(sort(filterSelected, order, todosList));
  }

  return (
    <>
      <div className="filters-container">
        <button className="close" onClick={HideFilterComponent}>
          X
        </button>

        <div className="order-container">
          <span className="order-span">ORDER</span>

          <ul>
            {arrayOfOrders.map((orderInArray) => (
              <li
                className={`order ${orderInArray === order ? "active" : ""}`}
                onClick={(e) => handleOrderClick(e, orderInArray as ORDER)}
                key={orderInArray}
              >
                {orderInArray}
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-container">
          <span className="filter-span">FILTER</span>

          <ul>
            {arrayOfFilters.map((filterInArray) => (
              <li
                className={`filter ${filterInArray === filter ? "active" : ""}`}
                onClick={(e) => handleFilterClick(e, filterInArray as FILTER)}
                key={filterInArray}
              >
                {filterInArray}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
