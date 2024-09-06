import { useState, useEffect } from 'react';
import './renderTasks.css';
import TaskForm from '../taskForm';
import pencil from '../../assets/pencil-icon.svg';
import trashCan from '../../assets/trash-can-icon.svg';
import checkedIcon from '../../assets/checked-icon.svg';
import uncheckedIcon from '../../assets/unchecked-icon.svg';

const RenderTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const sortedTasks = tasks.sort((a, b) => a.check - b.check);

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const createTask = (title, description) => {
    const newTask = {
      title,
      description,
      check: false,
    };

    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => console.log(error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => console.log(error));
  };

  const updateCheck = (id, check) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      return {
        ...task,
        check,
      };
    });
    setTasks(newTasks);

    const task = tasks.find((task) => task.id === id);

    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, check }),
    })
      .then(() => setTasks(newTasks))
      .catch((error) => console.log(error));
  };

  const updateTask = (id, title, description) => {
    const task = tasks.find((task) => task.id === id);

    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, title, description }),
    })
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
              updateTask(editId, title, description)
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
            onSubmit={createTask}
            title={'Adicionar nova tarefa'}
            submitTitle={'Adicionar'}
          />
        )}
        {sortedTasks.map((task) => (
          <div className={task.check ? 'checked' : null} key={task.id}>
            <img
              onClick={() => updateCheck(task.id, !task.check)}
              src={task.check ? checkedIcon : uncheckedIcon}
              alt="icon"
            />
            <div className="task-text">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <img 
              onClick={() => setEditId(task.id)}
              src={pencil} 
              alt="icon" />
            <img
              onClick={() => deleteTask(task.id)}
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
