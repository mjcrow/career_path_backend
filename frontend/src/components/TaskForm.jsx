import React, { useState } from 'react'; //add state for components
import axios from 'axios';
import '../Styles.css';  //new css

//initialize and update state variables
function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeNeeded, setTimeNeeded] = useState('');
    const [category, setCategory] = useState('');

    //task handler prevent refresh, retrieve authorization token, create new task
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const newTask = { title, description, time_needed: timeNeeded, category };
        axios.post('https://career-path-backend-0qxd.onrender.com', newTask, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                onTaskCreated(response.data);
                setTitle('');
                setDescription('');
                setTimeNeeded('');
                setCategory('');
            })
            .catch(error => console.error('Sorry, There was an error', error));
    };

    //task form onchange update state
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Time Needed (minutes)"
                value={timeNeeded}
                onChange={(e) => setTimeNeeded(e.target.value)}
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
