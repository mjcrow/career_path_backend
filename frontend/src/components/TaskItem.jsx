import React, { useState } from 'react';
import axios from 'axios';
import '../Styles.css';

//task component, edit and delete functions, initialize states
function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);
    const [isPriority, setIsPriority] = useState(task.priority);  // priority state is initialized

    //deletion handler send delete request, update component
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`https://career-path-backend-0qxd.onrender.com/${task.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => onTaskDeleted(task.id))
            .catch(error => console.error('There was an error deleting the task!', error));
    };

    //change edit mode
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    //update handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    //save new task token, update on authorization
    const handleSave = () => {
        const token = localStorage.getItem('token');
        axios.put(`https://career-path-backend-0qxd.onrender.com/tasks/${task.id}`, updatedTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                onTaskUpdated(response.data);
                setIsEditing(false);
            })
            .catch(error => console.error('Sorry there was an error', error));
    };

    //priority handler request, update on authorization
    const handleSetPriority = () => {
        const token = localStorage.getItem('token');
        const updatedPriorityTask = { ...updatedTask, priority: !isPriority };
        axios.put(`https://career-path-backend-0qxd.onrender.com/tasks/${task.id}`, updatedPriorityTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                onTaskUpdated(response.data);
                setIsPriority(!isPriority);
            })
            .catch(error => console.error('Sorry there was an error', error));
    };

    //render taskitem
    return (
        <li className={`task-item ${task.category.toLowerCase()} ${isPriority ? 'priority' : ''}`}>
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
                    <div className="button-group"> {/* Wrap buttons in a div with class button-group */}
                        <button onClick={handleEditToggle}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={handleSetPriority}>Set Priority</button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
