import React, { useState } from 'react'; //use states for components
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; //enable routes automatically no refresh

//hold and update state variables, react re-render automatically, route after login
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
    const navigate = useNavigate();

    //login handler prevent refresh, append to token, send and route to tasks
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axios.post('http://localhost:8000/token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/tasks');
        } catch (error) {
            window.alert('Login failed: Invalid username or password.'); // Display an alert on failure
        }
    };

    //login form
    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Conditionally render the error message */}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} //bind state
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default LoginForm;
