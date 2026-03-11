import { useState } from 'react';
import { useBoardStore } from '../store/boardStore';
import type { Priority } from '../types';
import { X, ChevronDown } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [error, setError] = useState('');
  const addTask = useBoardStore((state) => state.addTask);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task Title is required');
      return;
    }

    addTask(title.trim(), description.trim(), priority);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 dark:bg-black/60 backdrop-blur-md dark:backdrop-blur-xl flex items-center justify-center p-4">
      <div
        className="bg-white dark:bg-[#15151a] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl w-full max-w-md overflow-hidden animate-modal"
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02]">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6">
          <div className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Task Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full px-4 py-2.5 bg-white dark:bg-[#0c0c0e] border ${error ? 'border-red-500 focus:ring-red-500 dark:focus:ring-red-500' : 'border-gray-200 dark:border-white/10 focus:ring-indigo-500 dark:focus:ring-[rgb(34,187,254)]'} text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm dark:shadow-none`}
                placeholder="e.g., Update landing page copy"
                autoFocus
              />
              {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Priority
                </label>
                <div className="relative">
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full px-4 py-2.5 appearance-none bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[rgb(34,187,254)] focus:border-transparent transition-all outline-none shadow-sm dark:shadow-none font-medium"
                  >
                    <option value="High">High 🔴</option>
                    <option value="Medium">Medium 🟡</option>
                    <option value="Low">Low 🔵</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[rgb(34,187,254)] focus:border-transparent transition-all outline-none resize-none h-24 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm dark:shadow-none"
                placeholder="Add more details about this task..."
              />
            </div>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col-reverse md:flex-row justify-end items-stretch md:items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:text-white rounded-xl transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-[15px] font-bold text-white btn-premium rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
