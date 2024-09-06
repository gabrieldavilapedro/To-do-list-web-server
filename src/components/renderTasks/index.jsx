import { useState, useEffect } from 'react';
import './renderTasks.css';
import TaskForm from '../taskForm';
import pencil from '../../assets/pencil-icon.svg';
import trashCan from '../../assets/trash-can-icon.svg';
import checkedIcon from '../../assets/checked-icon.svg';
import uncheckedIcon from '../../assets/unchecked-icon.svg';
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from '../../requests/tasks';

const RenderTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const sortedTasks = tasks.sort((a, b) => a.check - b.check);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmitNewTask = (title, description) => {
    createTask(title, description)
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateCheck = (id, check) => {
    const task = tasks.find((task) => task.id === id);
    updateTask(id, { ...task, check })
      .then(() => {
        const newTasks = tasks.map((task) => {
          if (task.id !== id) return task;

          return {
            ...task,
            check,
          };
        });
        setTasks(newTasks);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateTask = (id, title, description) => {
    const task = tasks.find((task) => task.id === id);
    updateTask(id, { ...task, title, description })
      .then(() => {
        const newTasks = tasks.map((task) => {
          if (task.id !== id) return task;

          return {
            ...task,
            title,
            description,
          };
        });
        setTasks(newTasks);
        setEditId(null);
      })

      .catch((error) => console.log(error));
  };

  return (
    <div className="to-do-list">
      <div>
        {editId ? (
          <TaskForm
            onSubmit={(title, description) =>
              handleUpdateTask(editId, title, description)
            }
            title={'Editar tarefa'}
            submitTitle={'Editar'}
            taskTitle={tasks.find((task) => task.id === editId).title}
            taskDescription={
              tasks.find((task) => task.id === editId).description
            }
          />
        ) : (
          <TaskForm
            onSubmit={handleSubmitNewTask}
            title={'Adicionar nova tarefa'}
            submitTitle={'Adicionar'}
          />
        )}
        {sortedTasks.map((task) => (
          <div className={task.check ? 'checked' : null} key={task.id}>
            <img
              onClick={() => handleUpdateCheck(task.id, !task.check)}
              src={task.check ? checkedIcon : uncheckedIcon}
              alt="icon"
            />
            <div className="task-text">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <img onClick={() => setEditId(task.id)} src={pencil} alt="icon" />
            <img
              onClick={() => handleDeleteTask(task.id)}
              src={trashCan}
              alt="icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTasks;
