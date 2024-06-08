import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const UserRegistration = ({ handleRegistrationSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        dateOfBirth: '',
        address: '',
        licenseNumber: '',
        vehiclePlateNumber: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        phoneNumber: '',
        alternateEmail: '',
        termsAgreement: false
    });
    const [error, setError] = useState('');
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: val
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://traffic-regulation-api.vercel.app/register/user', formData);
            if (response.data.success) {
                // handleRegistrationSuccess();
                alert("Registration successful")
                navigate('/')
        
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred while registering. Please try again later.');
        }
    };

    return (
        <>
            <section className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="bg-gray-800 w-full md:w-2/3 lg:w-1/2 rounded-xl p-6 space-y-6">
                    <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-white">
                        Register your Account
                    </h1>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your username" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="••••••••" required />
                            </div>
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white">Full Name</label>
                                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your name" required />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-white">Date of Birth</label>
                                <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">City</label>
                                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="City Name" required />
                            </div>
                            <div>
                                <label htmlFor="licenseNumber" className="block mb-2 text-sm font-medium text-white">Driving License Number</label>
                                <input type="text" name="licenseNumber" id="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Driving License Number" required />
                            </div>
                            <div>
                                <label htmlFor="vehiclePlateNumber" className="block mb-2 text-sm font-medium text-white">Vehicle Plate Number</label>
                                <input type="text" name="vehiclePlateNumber" id="vehiclePlateNumber" value={formData.vehiclePlateNumber} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Vehicle Plate Number" required />
                            </div>
                            <div>
                                <label htmlFor="vehicleMake" className="block mb-2 text-sm font-medium text-white">Vehicle Make</label>
                                <input type="text" name="vehicleMake" id="vehicleMake" value={formData.vehicleMake} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Vehicle Make" required />
                            </div>
                            <div>
                                <label htmlFor="vehicleModel" className="block mb-2 text-sm font-medium text-white">Vehicle Model</label>
                                <input type="text" name="vehicleModel" id="vehicleModel" value={formData.vehicleModel} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Vehicle Model" required />
                            </div>
                            <div>
                                <label htmlFor="vehicleYear" className="block mb-2 text-sm font-medium text-white">Vehicle Year</label>
                                <input type="text" name="vehicleYear" id="vehicleYear" value={formData.vehicleYear} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Vehicle Year" required />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-white">Phone Number</label>
                                <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="9123456780" required />
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <input type="checkbox" id="termsAgreement" name="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800" required />
                            <label htmlFor="termsAgreement" className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                I agree to the <a href="#" className="hover:underline text-blue-400">terms and conditions</a>.
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <motion.button whileHover={{ scale: 1.2 }} type="submit" className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</motion.button>
                        </div>
                        <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/UserLogin" className="font-medium text-blue-600 hover:underline">Log in</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default UserRegistration;