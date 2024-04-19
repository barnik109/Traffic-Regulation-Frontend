import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ handleUserLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform authentication logic here
        // Upon successful authentication, call handleUserLogin() to redirect to user dashboard
        try {
            // Make an HTTP POST request to your backend server
            const response = await axios.post('https://traffic-regulation-api.vercel.app/login', {
                username,
                password
            });

            // Check if the login was successful
            if (response.data.success) {
                // Call the handleUserLogin function to handle successful login
                // handleUserLogin();
                alert("Login successful")
                navigate('/userDashboard');
                handleUserLogin(username);
            } else {
                // Handle authentication failure
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            setError('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="content bg-content-background">
            <div className="backGround overflow-y-auto py-6 flex flex-col h-screen items-center sm:py-12">
                <div className="relative w-full sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                            <h2 className="text-4xl font-semibold mb-10 text-black text-center sm:text-left">User Login</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username:</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password:</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserLogin;
