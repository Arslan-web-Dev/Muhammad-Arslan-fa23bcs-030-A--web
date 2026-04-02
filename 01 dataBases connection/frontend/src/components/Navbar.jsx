import React from 'react';
import { Sun, Moon, Search, Bell, Database, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { currentDB, status, switchDB, darkMode, setDarkMode } = useAppContext();

    return (
        <header className="h-20 sticky top-0 z-30 px-6 flex items-center justify-between transition-all">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-[1.25rem] py-3 pl-12 pr-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 dark:text-white transition-all outline-none text-sm shadow-sm"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4 ml-8">
                {/* DB Selector */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-sm"
                >
                    <div className="p-1.5 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
                        <Database className="w-4 h-4 text-cyan-500" />
                    </div>
                    <select
                        value={currentDB}
                        onChange={(e) => switchDB(e.target.value)}
                        className="bg-transparent border-none text-xs font-black tracking-tight focus:ring-0 cursor-pointer dark:text-gray-100 outline-none uppercase"
                    >
                        <option value="sqlite">SQLite</option>
                        <option value="supabase">Supabase</option>
                        <option value="mongodb">MongoDB</option>
                    </select>
                    <div className="flex items-center space-x-1 ml-2 pl-3 border-l border-gray-100 dark:border-gray-800">
                        <span className={`flex h-2 w-2 rounded-full ${status === 'Connected' ? 'bg-green-500' : 'bg-red-500'} relative`}>
                            {status === 'Connected' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        </span>
                    </div>
                </motion.div>

                {/* Theme Toggle */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 shadow-sm transition-colors"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                {/* Notifications & Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-3 text-gray-400 hover:text-cyan-500 transition-colors relative"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-[#F43F5E] rounded-full border-2 border-white dark:border-[#0F172A]"></span>
                    </motion.button>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3 p-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-sm cursor-pointer"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-600 flex items-center justify-center text-white font-black text-xs">
                            MA
                        </div>
                        <div className="hidden lg:block pr-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin</p>
                            <p className="text-xs font-bold dark:text-white">Muhammad Arslan</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
