import axios from 'axios';

// Configuração básica do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Função para obter todas as tarefas
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// funcao para pegar uma tarefa pelo id
export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};
