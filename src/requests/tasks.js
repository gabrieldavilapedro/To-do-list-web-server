import axios from 'axios';

// Configuração básica do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const addTask = async (title, description) => {
  const newTask = {
    title,
    description,
  };
  const response = await api.post('/tasks', newTask);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export const toggleCheck = async (id) => {
  const task = await getTaskById(id);
  const updatedTask = {
    check: !task.check,
  };
  await api.put(`/tasks/${id}`, updatedTask);
  return getTasks();
};
