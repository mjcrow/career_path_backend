import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import Register from './pages/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
