import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#0F172A] overflow-hidden relative transition-colors duration-500">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 dark:bg-cyan-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-600/10 blur-[120px] rounded-full"></div>

            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto px-6 pb-8">
                    <div className="max-w-7xl mx-auto py-2">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
