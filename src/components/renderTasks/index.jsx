import { useState, useEffect } from 'react';
import './renderTasks.css';
import CompletingTask from '../completingTask';


const RenderTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='to-do-list'>
            <h1>Tarefas:</h1>
            <div >
                {tasks.map(task => (
                    <div key={task.id}>
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>   
                        </div>
                        <div className='interactive'>
                            <CompletingTask checked={task.check} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenderTasks;