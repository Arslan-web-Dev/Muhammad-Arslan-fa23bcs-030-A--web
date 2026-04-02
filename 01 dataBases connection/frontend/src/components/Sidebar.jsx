import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboard, Users, Database, Settings, LogOut, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const { activePage, setActivePage, logout } = useAppContext();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'products', icon: Package, label: 'Products' },
        { id: 'db-manager', icon: Database, label: 'Database Manager' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className="hidden lg:flex flex-col m-4 mr-0 rounded-[2.5rem] glass dark:glass relative z-40 transition-shadow duration-300"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-12 w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'}`}>
                <motion.div
                    whileHover={{ rotate: 15 }}
                    className="p-3 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-2xl shadow-lg shadow-cyan-500/30"
                >
                    <Database className="w-6 h-6 text-white" />
                </motion.div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 tracking-tighter"
                    >
                        Agra Global
                    </motion.span>
                )}
            </div>

            <nav className="flex-1 px-4 mt-6">
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <motion.button
                                whileHover={{ scale: 1.03, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActivePage(item.id)}
                                className={`w-full flex items-center rounded-2xl transition-all duration-200 group relative ${isCollapsed ? 'justify-center p-3' : 'space-x-4 px-5 py-4'
                                    } ${activePage === item.id
                                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${activePage === item.id ? 'text-white' : 'group-hover:text-cyan-500 transition-colors'}`} />
                                {!isCollapsed && (
                                    <span className="font-semibold tracking-wide text-sm">{item.label}</span>
                                )}
                                {activePage === item.id && !isCollapsed && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    />
                                )}
                            </motion.button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6">
                <motion.button
                    whileHover={{ scale: 1.05, color: '#EF4444' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className={`w-full flex items-center text-gray-400 font-bold transition-all ${isCollapsed ? 'justify-center' : 'space-x-4 px-2'
                        }`}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">Log Out</span>}
                </motion.button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
