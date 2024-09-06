import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './taskForm.css';

const TaskForm = ({
  onSubmit,
  title,
  submitTitle,
  taskTitle,
  taskDescription,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    setNewTaskTitle(taskTitle || '');
    setNewTaskDescription(taskDescription || '');
  }, [taskTitle, taskDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTaskTitle, newTaskDescription);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <div className="New-task">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{submitTitle}</button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  taskTitle: PropTypes.string,
  taskDescription: PropTypes.string,
};

export default TaskForm;
