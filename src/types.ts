export type Id = string | number;

export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: Id;
  columnId: Id;
  title: string;
  description?: string;
  status: string; // Keep status as string for now to match columns
  priority: Priority;
  createdAt: string;
};

export type Column = {
  id: Id;
  title: string;
};
