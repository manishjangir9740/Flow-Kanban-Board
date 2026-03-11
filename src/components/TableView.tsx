import { useBoardStore } from '../store/boardStore';
import { useMemo } from 'react';
import clsx from 'clsx';

export const TableView = () => {
  const { tasks } = useBoardStore();

  const tasksArray = useMemo(() => Object.values(tasks), [tasks]);

  const sortedTasks = useMemo(() => {
    return [...tasksArray].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [tasksArray]);

  const getStatusDetails = (statusId: string) => {
    switch (statusId) {
      case 'TODO':
        return { label: 'To Do', bgColor: 'bg-blue-500' };
      case 'IN_PROGRESS':
        return { label: 'Working on it', bgColor: 'bg-[#fe9a00]' };
      case 'DONE':
        return { label: 'Done', bgColor: 'bg-emerald-500' };
      default:
        return { label: statusId, bgColor: 'bg-gray-500' };
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#9e0e0e] text-white';
      case 'Medium':
        return 'bg-[#a25ddc] text-white';
      case 'Low':
        return 'bg-[#0f388c] text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  if (tasksArray.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-gray-200">No tasks found</h3>
        <p className="text-slate-500 dark:text-gray-400 max-w-sm">Switch back to the Board view and create a task to see it here.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto rounded-xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#15151a] shadow-xl custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-slate-50/90 dark:bg-[#1f1f26]/90 backdrop-blur-md z-10 border-b border-slate-200 dark:border-white/10">
          <tr>
            <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400 w-1/2">Name</th>
            <th className="py-4 px-6 font-semibold text-sm text-center text-slate-500 dark:text-slate-400 w-1/6 border-l border-slate-200 dark:border-white/10">Status</th>
            <th className="py-4 px-6 font-semibold text-sm text-center text-slate-500 dark:text-slate-400 w-1/6 border-l border-slate-200 dark:border-white/10">Priority</th>
            <th className="py-4 px-6 font-semibold text-sm text-center text-slate-500 dark:text-slate-400 w-1/6 border-l border-slate-200 dark:border-white/10">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {sortedTasks.map((task) => {
            const status = getStatusDetails(task.status);
            return (
              <tr key={task.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-[2px] h-10 rounded-full", status.bgColor)} />
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-[15px]">{task.title}</span>
                  </div>
                </td>

                <td className="p-0 border-l border-slate-100 dark:border-white/5 relative">
                  <div className="absolute inset-1 flex">
                    <div className={clsx(
                      "flex-1 flex items-center justify-center text-white text-sm font-semibold rounded shadow-sm transition-all",
                      status.bgColor,
                      "hover:opacity-90 cursor-pointer"
                    )}>
                      {status.label}
                    </div>
                  </div>
                </td>

                <td className="p-0 border-l border-slate-100 dark:border-white/5 relative">
                  <div className="absolute inset-1 flex">
                    <div className={clsx(
                      "flex-1 flex items-center justify-center text-sm font-bold rounded shadow-sm transition-all",
                      getPriorityStyle(task.priority),
                      "hover:opacity-90 cursor-pointer"
                    )}>
                      {task.priority || 'Medium'}
                    </div>
                  </div>
                </td>

                <td className="py-3 px-6 text-center border-l border-slate-100 dark:border-white/5">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
