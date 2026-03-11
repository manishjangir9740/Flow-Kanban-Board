import type { Task } from '../types';
import { useBoardStore } from '../store/boardStore';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "bg-white dark:bg-[#15151a] p-5 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-xl border border-slate-200/50 dark:border-white/[0.05] cursor-grab active:cursor-grabbing hover:border-indigo-200 dark:hover:border-white/20 transition-all duration-300 group relative hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
        isDragging && "opacity-50 !shadow-2xl ring-2 ring-indigo-500 dark:ring-[rgb(34,187,254)] scale-105 z-50 dark:shadow-[0_0_40px_rgba(34,187,254,0.2)] shadow-indigo-200"
      )}
    >
      <div className="flex justify-between items-start mb-2 gap-3">
        <h3 className="font-semibold text-slate-800 dark:text-gray-100 break-words flex-1 text-[15px] md:text-[18px] leading-snug">
          {task.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 focus:opacity-100"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {task.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm whitespace-pre-wrap break-words line-clamp-3 leading-relaxed mb-3">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center text-xs font-medium text-gray-400 dark:text-gray-500 mt-auto">
        <div className={clsx(
          "px-2 py-1 rounded w-fit text-white leading-none font-bold",
          task.priority === 'High' && "bg-[#9e0e0e]",
          task.priority === 'Medium' && "bg-[#a25ddc]",
          task.priority === 'Low' && "bg-[#0f388c] text-white"
        )}>
          {task.priority || 'Medium'}
        </div>
        <span>{new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
};
