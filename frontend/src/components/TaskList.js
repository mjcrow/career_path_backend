import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import './TaskList.css'; // Correct CSS import

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/tasks', {
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
    }, []);

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
        <div>
            <h2>Task List</h2>
            <button onClick={handleLogout}>Logout</button>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
