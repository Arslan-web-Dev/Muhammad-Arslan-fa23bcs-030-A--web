import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const recordAPI = {
    getAll: () => api.get('/records'),
    create: (data) => api.post('/records', data),
    update: (id, data) => api.put(`/records/${id}`, data),
    delete: (id) => api.delete(`/records/${id}`)
};

export const configAPI = {
    switchDB: (dbType) => api.post('/config/database', { dbType }),
    getStatus: () => api.get('/config/status')
};

export default api;
