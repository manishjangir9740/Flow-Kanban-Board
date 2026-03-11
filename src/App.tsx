import { useEffect, useState } from 'react';
import { KanbanBoard } from './components/Board';
import { TableView } from './components/TableView';
import { Moon, Sun, TableProperties, Kanban } from 'lucide-react';
import { useThemeStore } from './store/themeStore';
import clsx from 'clsx';

type ViewMode = 'board' | 'table';

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const [view, setView] = useState<ViewMode>('board');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen relative text-slate-900 bg-[#F8FAFC] dark:bg-[#0c0c0e] dark:text-slate-100 transition-colors duration-300">
      <header className="glass-panel sticky top-0 z-10 border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-8">
            <div className="flex items-center gap-2 md:gap-3 group px-2 md:px-4 py-2 rounded-2xl transition-all duration-500 hover:bg-white/5">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 md:p-2.5 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-500 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white md:w-[26px] md:h-[26px] drop-shadow-md">
                    <path d="M4 19V5L12 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 19V5L12 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-sm">
                Flow<span className="font-light text-slate-400 dark:text-slate-500">Board</span>
              </h1>
            </div>
 
            <nav className="flex items-center bg-slate-100/50 dark:bg-black/20 p-1 rounded-xl border border-slate-200/50 dark:border-white/5">
              <button
                onClick={() => setView('board')}
                className={clsx(
                  "flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all",
                  view === 'board' 
                    ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200"
                )}
              >
                <Kanban size={14} className="md:w-4 md:h-4" />
                <span className="hidden md:inline">Board</span>
              </button>
              <button
                onClick={() => setView('table')}
                className={clsx(
                  "flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all",
                  view === 'table' 
                    ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200"
                )}
              >
                <TableProperties size={14} className="md:w-4 md:h-4" />
                <span className="hidden md:inline">Table</span>
              </button>
            </nav>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 md:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 transition-colors border border-slate-200/50 dark:border-white/5"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} className="md:w-5 md:h-5" /> : <Sun size={18} className="md:w-5 md:h-5" />}
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 h-[calc(100vh-5rem)] md:h-[calc(100vh-4.5rem)] relative z-0 flex flex-col">
        {view === 'board' ? <KanbanBoard /> : <TableView />}
      </main>
    </div>
  );
}

export default App;



