export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface ITodos {
  items: ITodo[];
  populate: () => void;
  toggle: (todoId: number) => void;
  add: (text: string) => void;
  remove: (todoId: number) => void;
  update: (todoId: number, text: string) => void;
  save: () => void;
}
