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

  return (
    <div className="to-do-list">
      <div>
        <NewTask setTasks={setTasks} />
        {sortedTasks.map((task) => (
          <div className={task.check ? 'checked' : null} key={task.id}>
            <CompletingTask
              id={task.id}
              checked={task.check}
              setTasks={setTasks}
            />
            <div className="task-text">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <DeleteTask id={task.id} setTasks={setTasks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTasks;
