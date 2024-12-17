// code page to add the job to the company

import { useState } from 'react';
import axios from 'axios';

export const Addjob = ({ togglePopup }) => {
    const company = localStorage.getItem('name');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            setTitle(value);
        } else if (name === 'location') {
            setLocation(value);
        } else if (name === 'type') {
            setType(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/api/jobs", {
                companyName: company, 
                title,
                location,
                type,
            });

            if (response.status === 200) {
                togglePopup();
                alert('Job added successfully');
            } else {
                alert('Failed to add job');
            }
        } catch (error) {
            console.error('Error adding job:', error);
            alert('Error adding job');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center mt-12">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">ADD JOB</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={company}
                                    disabled
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Job Type</label>
                                <select
                                    name="type"
                                    value={type}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="internship">Internship</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={togglePopup}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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
    );
};
