import { useState, useEffect } from 'react';
import './renderTasks.css';
import CompletingTask from '../completingTask';
import NewTask from '../newTask';
import DeleteTask from '../deleteTask';
import { getTasks } from '../../requests/tasks';

const RenderTasks = () => {
  const [tasks, setTasks] = useState([]);

  const sortedTasks = tasks.sort((a, b) => a.check - b.check);

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
  }, []);

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

  const toggleCheck = (id, check) => {
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

  return (
    <div className="to-do-list">
      <div>
        <NewTask setTasks={setTasks} />
        {sortedTasks.map((task) => (
          <div className={task.check ? 'checked' : null} key={task.id}>
            <CompletingTask
              id={task.id}
              checked={task.check}
              toggleCheck={toggleCheck}
            />
            <div className="task-text">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <DeleteTask id={task.id} deleteTask={deleteTask} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTasks;
