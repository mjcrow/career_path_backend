import React, { useState } from 'react';//add state to components
import axios from 'axios';

//initialize and update state variables
function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //register handler prevent refresh, handle token
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://career-path-backend-0qxd.onrender.com', {
                username,
                password,
            });
            alert('user registered');
        } catch (error) {
            console.error('Sorry, There has been an error registering', error);
        }
    };

    //register form
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;
