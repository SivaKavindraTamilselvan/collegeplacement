import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const History = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filters, setFilters] = useState({
        jobTitle: '',
        companyname: '',
        status: '',
    });
    const name = localStorage.getItem('name');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                    params: { name },
                });
                const appliedApplications = response.data;
                setApplications(appliedApplications); 
                setFilteredApplications(appliedApplications); 
                setLoading(false); 
            } catch (error) {
                setError('Error fetching applications'); 
                setLoading(false);
            }
        };

        if (name) {
            fetchApplications(); 
        } else {
            setError('User not logged in');
            setLoading(false);
        }
    }, [name]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    useEffect(() => {
        const filtered = applications.filter((application) => {
            return (
                (filters.jobTitle ? application.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()) : true) &&
                (filters.companyname ? application.companyname.toLowerCase().includes(filters.companyname.toLowerCase()) : true) &&
                (filters.status ? application.status.toLowerCase().includes(filters.status.toLowerCase()) : true)
            );
        });
        setFilteredApplications(filtered);
    }, [filters, applications]);

    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex justify-between items-center mb-8">
                <h1 className="text-xl font-bold">COMPANY JOB LISTINGS</h1>
            </div>
            <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                <aside className="w-full lg:w-1/4 bg-white p-4 h-full rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Search</label>
                            <input
                                type="text"
                                name="companyname"
                                value={filters.companyname}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Search company..."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Title</label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={filters.jobTitle}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Search job titles..."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Status</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="text-center text-gray-600">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : (
                        <div>
                            {filteredApplications.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <thead className="bg-blue-600 text-white">
                                            <tr>
                                                <th className="px-6 py-3 text-left">Company Name</th>
                                                <th className="px-6 py-3 text-left">User Name</th>
                                                <th className="px-6 py-3 text-left">Job Title</th>
                                                <th className="px-6 py-3 text-left">Status</th>
                                                <th className="px-6 py-3 text-left">Actions</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredApplications.map((application) => (
                                                <tr key={application._id} className="border-b hover:bg-gray-100">
                                                    <td className="px-6 py-4 text-blue-900">{application.companyname}</td>
                                                    <td className="px-6 py-4">{application.jobTitle}</td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`/user/${application.userId}`}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            View User
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">{application.status}</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href={`http://localhost:8081/uploads/${application.resume}`}
                                                            download
                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                        >
                                                            View Resume
                                                        </a>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 mt-4">No applications found.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
