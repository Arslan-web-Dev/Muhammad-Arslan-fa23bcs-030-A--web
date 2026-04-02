import React, { useState } from 'react';
import { Database, Lock, User, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const { login } = useAppContext();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            login();
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#020617] p-4 font-sans relative overflow-hidden transition-colors duration-1000">
            {/* Massive Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 dark:bg-cyan-600/20 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 dark:bg-emerald-600/20 blur-[150px] rounded-full animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-lg bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/40"
                    >
                        <Database className="w-12 h-12 text-white" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter uppercase">
                        Agra Global
                    </h1>
                    <div className="flex items-center justify-center space-x-2 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                        <ShieldCheck size={14} className="text-cyan-500" />
                        <span>Management System</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-4">Access Identifier</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors group-focus-within:bg-cyan-500 group-focus-within:text-white">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="Username (admin)"
                                className="w-full bg-white/50 dark:bg-gray-800/20 border border-white/50 dark:border-white/5 rounded-[1.75rem] py-5 pl-16 pr-6 text-gray-900 dark:text-white placeholder:text-gray-400/50 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-inner font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-4">Security Key</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors group-focus-within:bg-cyan-500 group-focus-within:text-white">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-white/50 dark:bg-gray-800/20 border border-white/50 dark:border-white/5 rounded-[1.75rem] py-5 pl-16 pr-6 text-gray-900 dark:text-white placeholder:text-gray-400/50 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all shadow-inner font-bold"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-black py-5 rounded-[1.75rem] transition-all shadow-2xl shadow-cyan-600/30 flex items-center justify-center group relative overflow-hidden"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span className="tracking-tight text-lg">Authenticate</span>
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.button>
                </form>

                <div className="mt-12 text-center flex items-center justify-center space-x-6">
                    <button className="text-[10px] font-black text-gray-400 hover:text-cyan-500 uppercase tracking-widest transition-colors">
                        Recovery Mode
                    </button>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <button className="text-[10px] font-black text-gray-400 hover:text-cyan-500 uppercase tracking-widest transition-colors">
                        Encryption Key
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 flex items-center space-x-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]"
            >
                <Zap size={14} className="text-amber-500" />
                <span>Powered by Advanced Agentic Coding</span>
            </motion.div>
        </div>
    );
};

export default Login;
