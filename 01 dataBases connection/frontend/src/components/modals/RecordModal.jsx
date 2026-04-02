import React, { useState, useEffect } from 'react';
import { X, Package, Shield, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecordModal = ({ isOpen, onClose, onSubmit, editingRecord }) => {
    const [formData, setFormData] = useState({
        p_id: '',
        p_name: '',
        p_category: 'Electronics',
        p_cost: '',
        targets: ['sqlite'] // Default to current or sqlite
    });

    useEffect(() => {
        if (editingRecord) {
            setFormData(editingRecord);
        } else {
            setFormData({ p_id: '', p_name: '', p_category: 'Electronics', p_cost: '', targets: ['sqlite'] });
        }
    }, [editingRecord, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-lg glass dark:glass rounded-[2.5rem] p-10 relative z-10 shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-8 top-8 p-2 text-gray-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>

                    <div className="mb-10 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-cyan-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                            <Package size={32} />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white tracking-tighter">
                            {editingRecord ? 'Update Product' : 'Register Product'}
                        </h2>
                        <p className="text-sm font-medium text-gray-400 mt-2 uppercase tracking-widest">
                            {editingRecord ? `Tracking ID: ${editingRecord.p_id}` : 'Syncing with global inventory system'}
                        </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Product Name</label>
                                <div className="relative group">
                                    <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.p_name}
                                        onChange={(e) => setFormData({ ...formData, p_name: e.target.value })}
                                        placeholder="e.g. Premium Silk Scarf"
                                        className="w-full bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold dark:text-white focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category</label>
                                <div className="relative group">
                                    <Shield className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                    <select
                                        value={formData.p_category}
                                        onChange={(e) => setFormData({ ...formData, p_category: e.target.value })}
                                        className="w-full bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold dark:text-white focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-sm appearance-none"
                                    >
                                        <option value="Electronics">Electronics</option>
                                        <option value="Textiles">Textiles</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Food & Spices">Food & Spices</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Business ID</label>
                                <div className="relative group">
                                    <Shield className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.p_id}
                                        onChange={(e) => setFormData({ ...formData, p_id: e.target.value })}
                                        placeholder="AGR-001"
                                        className="w-full bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold dark:text-white focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Unit Cost (PKR)</label>
                                <div className="relative group">
                                    <Save className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                    <input
                                        type="number"
                                        value={formData.p_cost}
                                        onChange={(e) => setFormData({ ...formData, p_cost: e.target.value })}
                                        placeholder="1500"
                                        className="w-full bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold dark:text-white focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {!editingRecord && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Target Databases (Sync)</label>
                                <div className="flex flex-wrap gap-3">
                                    {['sqlite', 'mongodb', 'supabase'].map(db => (
                                        <label key={db} className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${formData.targets.includes(db)
                                                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400'
                                                : 'bg-white/10 border-gray-200 dark:border-gray-700 text-gray-400'
                                            }`}>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.targets.includes(db)}
                                                onChange={(e) => {
                                                    const newTargets = e.target.checked
                                                        ? [...formData.targets, db]
                                                        : formData.targets.filter(t => t !== db);
                                                    setFormData({ ...formData, targets: newTargets });
                                                }}
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{db}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-sm font-black text-gray-500 dark:text-gray-400 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-sm font-black text-white rounded-2xl shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/40 transition-all active:scale-95"
                            >
                                {editingRecord ? 'Push Updates' : 'Add to Inventory'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RecordModal;
