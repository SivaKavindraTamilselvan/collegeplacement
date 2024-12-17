import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Addc = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        ceo: '',
    });

    const [isOpen, setIsOpen] = useState(true); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/add-company', formData);

            if (response.status === 201) {
                alert('Company added successfully!');
                setFormData({ name: '', phone: '', email: '', ceo: '' });
                navigate('/placement/home'); 
            } else {
                alert('Failed to add company. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    const handleCancel = () => {
        setIsOpen(false); 
        setFormData({ name: '', phone: '', email: '', ceo: '' }); 
    };

    return (
        isOpen && (
            <div className="mt-28 fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                    <h2 className="text-xl font-bold mb-4">ADD COMPANY</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Company Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Company Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">CEO</label>
                                <input
                                    type="text"
                                    name="ceo"
                                    value={formData.ceo}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={handleCancel} 
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};
