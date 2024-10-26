import { TodoType } from "../../types/TodoType";
import { PRIORITY_VALUE } from "../../enums/PriorityEnum";
import { FILTER } from "../../enums/SortTypeEnum";
import { ORDER } from "../../enums/SortTypeEnum";

// Function to get the priority value according to the priority string value (LOW, MEDIUM, HIGH) 
function getPriorityValue(priority: string): number {
  switch (priority) {
    case "LOW":
      return PRIORITY_VALUE.LOW;
    case "MEDIUM":
      return PRIORITY_VALUE.MEDIUM;
    case "HIGH":
      return PRIORITY_VALUE.HIGH;
    default:
      return 0;
  }
}

// Function to sort the list of todos according to the 'sortType' and 'order' parameters 
export function sort(sortType: FILTER, order: ORDER, list: TodoType[]) {
  if (sortType === FILTER.DATE && order === ORDER.ASC)
    return list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  else if (sortType === FILTER.DATE && order === ORDER.DESC)
    return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  else if (sortType === FILTER.TITLE && order === ORDER.DESC)
    return list.sort((a, b) => (a.title < b.title ? 1 : -1));
  else if (sortType === FILTER.TITLE && order === ORDER.ASC)
    return list.sort((a, b) => (a.title > b.title ? 1 : -1));
  else if (sortType === FILTER.PRIORITY) {
    return list.sort((a, b) => {
      const priorityComparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
      if (priorityComparison === 0) return a.createdAt > b.createdAt ? 1 : -1;
      else return order === ORDER.ASC ? priorityComparison : -priorityComparison;
    });
  } 
  else if (sortType === FILTER.COMPLETED) {
    return list.sort((a, b) => {
      let completedComparison;
      if (a.completed && !b.completed) completedComparison = 1;
      else if (!a.completed && b.completed) completedComparison = -1;
      else return a.createdAt > b.createdAt ? 1 : -1;

      return order === ORDER.ASC ? completedComparison : -completedComparison;
    });
  } 
  else return list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
}
