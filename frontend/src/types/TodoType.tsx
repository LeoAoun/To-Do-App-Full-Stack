type TodoType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
  userId: number;
};

type TodoTypeDTO = {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  userId: number;
};

export type { TodoType, TodoTypeDTO };
