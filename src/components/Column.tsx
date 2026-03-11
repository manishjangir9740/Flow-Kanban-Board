import { useDroppable } from '@dnd-kit/core';
import type { Column as ColumnType, Task } from '../types';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
}

export const KanbanColumn = ({ column, tasks, onAddTask }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div
      className={clsx(
        "glass-panel rounded-2xl w-[calc(100vw-3rem)] md:w-80 flex-shrink-0 flex flex-col max-h-full transition-all duration-300",
        isOver && "ring-2 ring-indigo-400 dark:ring-[rgb(34,187,254)] bg-indigo-50/50 dark:bg-white/[0.05] scale-[1.02] shadow-indigo-100 dark:shadow-[0_0_30px_rgba(34,187,254,0.2)]"
      )}
    >
      <div className="p-4 border-b border-gray-200/50 dark:border-white/[0.08] flex justify-between items-center bg-white/50 dark:bg-white/[0.02] rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
            column.id === 'TODO' && "bg-blue-500 dark:bg-grad-1 shadow-blue-200 dark:shadow-none",
            column.id === 'IN_PROGRESS' && "bg-[#fe9a00] dark:bg-grad-3 shadow-orange-200 dark:shadow-none",
            column.id === 'DONE' && "bg-emerald-500 dark:bg-grad-4 shadow-emerald-200 dark:shadow-none"
          )} />
          <h2 className="font-bold text-slate-700 dark:text-gray-100 tracking-wide">{column.title}</h2>
          <span className="bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm dark:shadow-none border border-slate-200/50 dark:border-none">
            {tasks.length}
          </span>
        </div>
        {column.id === 'TODO' && (
          <button
            onClick={onAddTask}
            className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-all hover:scale-110 active:scale-95 shadow-sm hover:shadow dark:shadow-none"
            title="Add new task"
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 overflow-y-auto min-h-[150px] flex flex-col gap-3 custom-scrollbar"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex text-gray-400 dark:text-gray-500 items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-white/30 dark:bg-white/[0.01]">
            <p className="text-sm font-medium">No tasks in this column</p>
          </div>
        )}
      </div>
    </div>
  );
};
