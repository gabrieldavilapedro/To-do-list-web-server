import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (title, description) => {
  const newTask = {
    title,
    description,
    check: false,
  };

  const response = await api.post('/tasks', newTask);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
}

export const updateTask = async (id, properties) => {
  await api.put(`/tasks/${id}`, properties);
}