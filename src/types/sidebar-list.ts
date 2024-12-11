export type TToDoListItem = {
  id: number;
  description: string;
  finished?: boolean;
};

export type TToDoList = {
  id: number;
  description: string;
  items: TToDoListItem[];
};
