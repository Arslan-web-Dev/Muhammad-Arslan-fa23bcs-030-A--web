import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useAppContext } from './context/AppContext';
import MainLayout from './layout/MainLayout';
import Dashboard from './components/Dashboard';
import Table from './components/Table';
import RecordModal from './components/modals/RecordModal';
import Login from './components/Login';

const AppContent = () => {
  const { isAuthenticated, login, activePage, addRecord, updateRecord } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingRecord) {
      updateRecord(editingRecord.id, data);
    } else {
      addRecord(data);
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <Dashboard />
            <Table onEdit={handleEdit} onAdd={handleAdd} />
          </>
        );
      case 'users':
        return (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl text-center border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold dark:text-white mb-2">User Management</h2>
            <p className="text-gray-500">Comprehensive user access and profile management coming soon.</p>
          </div>
        );
      case 'products':
        return (
          <Table onEdit={handleEdit} onAdd={handleAdd} />
        );
      case 'db-manager':
        return (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl text-center border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold dark:text-white mb-2">Database Settings</h2>
            <p className="text-gray-500">Configure connection strings and migration toolsets.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl text-center border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold dark:text-white mb-2">Global Settings</h2>
            <p className="text-gray-500">Manage application preferences and security policies.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout>
      {renderContent()}
      <RecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingRecord={editingRecord}
      />
    </MainLayout>
  );
};

function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" />
      <AppContent />
    </AppProvider>
  );
}

export default App;
