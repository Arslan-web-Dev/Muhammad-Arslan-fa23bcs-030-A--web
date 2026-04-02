import React from 'react';
import { Package, Database, Clock, Zap, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { records, currentDB } = useAppContext();

    const stats = [
        {
            label: 'Inventory Count',
            value: records.length,
            icon: Package,
            gradient: 'from-[#06B6D4] to-[#10B981]',
            shadow: 'shadow-cyan-500/20'
        },
        {
            label: 'Active Database',
            value: currentDB.toUpperCase(),
            icon: Database,
            gradient: 'from-[#0EA5E9] to-[#06B6D4]',
            shadow: 'shadow-sky-500/20'
        },
        {
            label: 'System Status',
            value: 'Healthy',
            icon: Zap,
            gradient: 'from-[#10B981] to-[#34D399]',
            shadow: 'shadow-emerald-500/20'
        },
        {
            label: 'Last Updated',
            value: 'Just Now',
            icon: Clock,
            gradient: 'from-[#14B8A6] to-[#2DD4BF]',
            shadow: 'shadow-teal-500/20'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ translateY: -8, scale: 1.02 }}
                    className="glass dark:glass p-6 rounded-[2rem] relative overflow-hidden group cursor-default"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <stat.icon size={80} />
                    </div>

                    <div className="relative z-10">
                        <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${stat.shadow}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                                {stat.label}
                            </h3>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                    {stat.value}
                                </p>
                                <div className="flex items-center text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full mb-1">
                                    <TrendingUp size={12} className="mr-1" />
                                    100%
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Dashboard;
