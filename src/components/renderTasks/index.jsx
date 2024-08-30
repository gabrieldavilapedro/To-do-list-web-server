import { useState, useEffect } from 'react';
import './renderTasks.css';
import CompletingTask from '../completingTask';
import NewTask from '../newTask';


const RenderTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.log(error));
    }, []);

    const addTask = (title, description) => {
        const newTask = {
            title,
            description,
            check: false
        };

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(data => {
            setTasks([...tasks, data]);
        })
        .catch(error => console.log(error));
    };

    const toggleCheck = (id, check) => {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task;
            
            return {
                ...task,
                check
            };
        });
        setTasks(newTasks);

        const task = tasks.find(task => task.id === id);

        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...task, check })
        })
        .then(() => setTasks(newTasks))
        .catch(error => console.log(error));
    }

    const sortedTasks = tasks.sort((a, b) => a.check - b.check);

    return (
        <div className='to-do-list'>
            <div >
                <NewTask addTask={addTask} />
                {sortedTasks.map(task => (
                    <div key={task.id}>
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>   
                        </div>
                        <div className='interactive'>
                            <CompletingTask id={task.id}checked={task.check} toggleCheck={toggleCheck}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenderTasks;