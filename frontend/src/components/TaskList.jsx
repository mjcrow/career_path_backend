import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import '../Styles.css';  // Import the CSS file

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
    const [totalSchoolMinutes, setTotalSchoolMinutes] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://career-path-backend-0qxd.onrender.com/tasks?sort_by=${sortBy}&order=${order}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);

                // Calculate total minutes for work and school tasks
                const workMinutes = response.data
                    .filter(task => task.category.toLowerCase() === 'work')
                    .reduce((acc, task) => acc + task.time_needed, 0);

                const schoolMinutes = response.data
                    .filter(task => task.category.toLowerCase() === 'school')
                    .reduce((acc, task) => acc + task.time_needed, 0);

                setTotalWorkMinutes(workMinutes);
                setTotalSchoolMinutes(schoolMinutes);
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
        if (newTask.category.toLowerCase() === 'work') {
            setTotalWorkMinutes((prevMinutes) => prevMinutes + newTask.time_needed);
        } else if (newTask.category.toLowerCase() === 'school') {
            setTotalSchoolMinutes((prevMinutes) => prevMinutes + newTask.time_needed);
        }
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );

        // Update totals based on the updated task
        const oldTask = tasks.find(task => task.id === updatedTask.id);
        if (oldTask) {
            if (oldTask.category.toLowerCase() === 'work') {
                setTotalWorkMinutes((prevMinutes) => prevMinutes - oldTask.time_needed + updatedTask.time_needed);
            } else if (oldTask.category.toLowerCase() === 'school') {
                setTotalSchoolMinutes((prevMinutes) => prevMinutes - oldTask.time_needed + updatedTask.time_needed);
            }
        }
    };

    const handleTaskDeleted = (deletedTaskId) => {
        const deletedTask = tasks.find(task => task.id === deletedTaskId);
        if (deletedTask) {
            if (deletedTask.category.toLowerCase() === 'work') {
                setTotalWorkMinutes((prevMinutes) => prevMinutes - deletedTask.time_needed);
            } else if (deletedTask.category.toLowerCase() === 'school') {
                setTotalSchoolMinutes((prevMinutes) => prevMinutes - deletedTask.time_needed);
            }
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
    };

    return (
        <div className="task-list-container">
            <h2 className="task-list-header">Task List</h2>
            <div className="task-totals">
                <p>Total Work Minutes: {totalWorkMinutes}</p>
                <p>Total School Minutes: {totalSchoolMinutes}</p>
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
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
