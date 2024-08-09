import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import '../Styles.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState('title');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8000/tasks?sort_by=${sortBy}&order=${order}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };

        fetchTasks();
    }, [sortBy, order]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
    };

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h2>Task List</h2>
                <div className="sort-options">
                    <label>Sort by: </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="time_needed">Time Needed</option>
                        <option value="category">Category</option>
                    </select>
                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <ul className="task-grid">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                    />
                ))}
            </ul>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default TaskList;
