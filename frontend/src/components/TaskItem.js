import React, { useState } from 'react';
import axios from 'axios';
import './TaskList.css';  // Import the CSS file

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8000/tasks/${task.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => onTaskDeleted(task.id))
            .catch(error => console.error('There was an error deleting the task!', error));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSave = () => {
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:8000/tasks/${task.id}`, updatedTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                onTaskUpdated(response.data);
                setIsEditing(false);
            })
            .catch(error => console.error('There was an error updating the task!', error));
    };

    return (
        <li className="task-item">
            {isEditing ? (
                <div className="edit-task-form">
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        value={updatedTask.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="time_needed"
                        value={updatedTask.time_needed}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="category"
                        value={updatedTask.category}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Time Needed: {task.time_needed} minutes</p>
                    <p>Category: {task.category}</p>
                    <button onClick={handleEditToggle}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
