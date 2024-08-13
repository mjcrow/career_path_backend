import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';  // Import the CSS file

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeNeeded, setTimeNeeded] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const newTask = { title, description, time_needed: timeNeeded, category };
        axios.post('http://localhost:8000/tasks/', newTask, {
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
