import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Download, Search, Filter, Mail, Phone, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Table = ({ onEdit, onAdd }) => {
    const { records, deleteRecord, loading } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const safeRecords = Array.isArray(records) ? records : [];
    const filteredRecords = safeRecords.filter(r =>
        r.p_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.p_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportCSV = () => {
        const headers = ['ID', 'Product ID', 'Product Name', 'Cost', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...filteredRecords.map(r => [r.id, r.p_id, r.p_name, r.p_cost, r.created_at].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `records_export_${Date.now()}.csv`;
        a.click();
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black dark:text-white tracking-tighter">Inventory Management</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-widest flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2 text-cyan-500" />
                        Secure Multi-Database Sync
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={exportCSV}
                        className="flex items-center space-x-2 px-5 py-3 text-sm font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-cyan-500/30 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAdd}
                        className="flex items-center space-x-2 px-6 py-3 text-sm font-black text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/40 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Product</span>
                    </motion.button>
                </div>
            </div>

            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-[2.5rem] p-4 border border-white/20 dark:border-gray-800/50 shadow-inner">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Product ID</th>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Unit Cost</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-32 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="relative w-12 h-12">
                                                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                                <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase animate-pulse">Synchronizing Data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredRecords.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-32 text-center">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center space-y-4"
                                            >
                                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2 animate-bounce">
                                                    <Search size={32} className="text-gray-300 dark:text-gray-600" />
                                                </div>
                                                <h4 className="text-lg font-bold dark:text-white">No records discovered</h4>
                                                <p className="text-sm text-gray-400">Try adjusting your search or add a new entry.</p>
                                            </motion.div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRecords.map((record, idx) => (
                                        <motion.tr
                                            key={record.id || idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group"
                                        >
                                            <td className="px-8 py-5 bg-white dark:bg-[#1E293B] first:rounded-l-3xl shadow-sm border-y border-l border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#06B6D4]/5 dark:group-hover:bg-[#06B6D4]/10">
                                                <span className="text-xs font-black text-cyan-500 dark:text-cyan-400 font-mono">
                                                    {record.p_id || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-white dark:bg-[#1E293B] border-y border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#06B6D4]/5 dark:group-hover:bg-[#06B6D4]/10">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-cyan-500/20 text-center px-1">
                                                        {record.p_name?.substring(0, 2).toUpperCase() || 'P'}
                                                    </div>
                                                    <span className="text-sm font-black dark:text-white tracking-tight">{record.p_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-white dark:bg-[#1E293B] border-y border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#06B6D4]/5 dark:group-hover:bg-[#06B6D4]/10">
                                                <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                                                    {record.p_category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-white dark:bg-[#1E293B] border-y border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#06B6D4]/5 dark:group-hover:bg-[#06B6D4]/10">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-100 font-bold">
                                                        PKR {record.p_cost?.toLocaleString() || '0'}
                                                    </div>
                                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                        Market Rate
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-white dark:bg-[#1E293B] border-y border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#06B6D4]/5 dark:group-hover:bg-[#06B6D4]/10">
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-white dark:bg-[#1E293B] last:rounded-r-3xl border-y border-r border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-[#6366F1]/5 dark:group-hover:bg-[#6366F1]/10 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => onEdit(record)}
                                                        className="p-2.5 text-gray-400 hover:text-cyan-600 rounded-xl transition-all"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => {
                                                            if (window.confirm('Delete this record permanently?')) {
                                                                deleteRecord(record.id);
                                                            }
                                                        }}
                                                        className="p-2.5 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between px-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Synchronized Index: {filteredRecords.length} / {safeRecords.length}
                </p>
                <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-xl glass dark:glass flex items-center justify-center opacity-50 cursor-not-allowed">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-black text-sm shadow-lg shadow-cyan-600/20">1</button>
                    <button className="w-10 h-10 rounded-xl glass dark:glass flex items-center justify-center opacity-50 cursor-not-allowed">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Table;
