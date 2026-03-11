import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Priority, Id } from '../types';

interface BoardState {
  tasks: Record<Id, Task>;
  addTask: (title: string, description: string, priority: Priority) => void;
  deleteTask: (id: Id) => void;
  moveTask: (id: Id, newStatus: Id) => void;
}

const initialTasksArr: Task[] = [];

const initialTasks: Record<Id, Task> = initialTasksArr.reduce((acc, task) => {
  acc[task.id] = task;
  return acc;
}, {} as Record<Id, Task>);

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      // Initialize with object map for O(1) lookups
      tasks: initialTasks,
      
      addTask: (title, description, priority) =>
        set((state) => {
          const newId = crypto.randomUUID();
          return {
            tasks: {
              ...state.tasks,
              [newId]: {
                id: newId,
                columnId: 'TODO',
                title,
                description,
                status: 'TODO',
                priority,
                createdAt: new Date().toISOString(),
              }
            }
          };
        }),

      deleteTask: (id) =>
        set((state) => {
          const { [id]: deletedTask, ...restTasks } = state.tasks;
          return { tasks: restTasks };
        }),

      moveTask: (id, newStatus) =>
        set((state) => {
          const task = state.tasks[id];
          if (!task) return state;
          
          return {
            tasks: {
              ...state.tasks,
              [id]: { ...task, status: String(newStatus), columnId: newStatus }
            }
          };
        }),
    }),
    {
      name: 'kanban-storage',
      version: 3,
      migrate: (persistedState: any, version: number) => {
        if (version < 3) {
          const tasksArray = Array.isArray(persistedState.tasks) 
            ? persistedState.tasks 
            : Object.values(persistedState.tasks || {});
          
          const nextTasks: Record<string, any> = {};
          for (const t of tasksArray) {
            nextTasks[t.id] = {
              ...t,
              priority: t.priority || 'Medium',
              columnId: t.columnId || t.status
            };
          }
          return { ...persistedState, tasks: nextTasks };
        }
        return persistedState;
      }
    }
  )
);
