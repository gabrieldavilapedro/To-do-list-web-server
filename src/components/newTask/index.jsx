import { useState } from 'react';
import PropTypes from 'prop-types';
import './newTask.css';
import { addTask } from '../../requests/tasks';

const TaskForm = ({ setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTaskTitle, newTaskDescription).then((task) => {
      setTasks((tasks) => [...tasks, task]);
    });
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <div className="New-task">
      <h2>Adicionar nova tarefa</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          maxLength={30}
          required
        />
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default TaskForm;
