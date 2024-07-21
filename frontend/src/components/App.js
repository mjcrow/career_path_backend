import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './pages/TaskList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/" element={<Login />} />  {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
};

export default App;
