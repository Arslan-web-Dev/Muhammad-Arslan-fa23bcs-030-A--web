import React, { createContext, useContext, useState, useEffect } from 'react';
import { recordAPI, configAPI } from '../api/api';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [activePage, setActivePage] = useState('dashboard');
    const [records, setRecords] = useState([]);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };
    const [currentDB, setCurrentDB] = useState('sqlite');
    const [status, setStatus] = useState('Disconnected');
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const res = await recordAPI.getAll();
            setRecords(res.data);
        } catch (error) {
            toast.error('Failed to fetch records');
        } finally {
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        try {
            const res = await configAPI.getStatus();
            setCurrentDB(res.data.currentDB);
            setStatus(res.data.status);
        } catch (error) {
            setStatus('Disconnected');
        }
    };

    useEffect(() => {
        fetchStatus();
        fetchRecords();
    }, []);

    const switchDB = async (dbType) => {
        setLoading(true);
        try {
            await configAPI.switchDB(dbType);
            setCurrentDB(dbType);
            toast.success(`Switched to ${dbType}`);
            await fetchRecords();
        } catch (error) {
            toast.error(`Failed to switch to ${dbType}`);
        } finally {
            setLoading(false);
        }
    };

    const addRecord = async (data) => {
        try {
            await recordAPI.create(data);
            toast.success('Record added successfully');
            await fetchRecords();
        } catch (error) {
            toast.error('Failed to add record');
        }
    };

    const updateRecord = async (id, data) => {
        try {
            await recordAPI.update(id, data);
            toast.success('Record updated successfully');
            await fetchRecords();
        } catch (error) {
            toast.error('Failed to update record');
        }
    };

    const deleteRecord = async (id) => {
        try {
            await recordAPI.delete(id);
            toast.success('Record deleted successfully');
            await fetchRecords();
        } catch (error) {
            toast.error('Failed to delete record');
        }
    };

    return (
        <AppContext.Provider value={{
            records, currentDB, status, loading, darkMode,
            setDarkMode, switchDB, addRecord, updateRecord, deleteRecord,
            fetchRecords, isAuthenticated, login, logout, activePage, setActivePage
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
