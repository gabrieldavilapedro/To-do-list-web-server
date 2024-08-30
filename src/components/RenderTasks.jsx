import { useState, useEffect } from 'react';

const RenderTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Tasks:</h1>
            <div className='todo-list'>
                {tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenderTasks;