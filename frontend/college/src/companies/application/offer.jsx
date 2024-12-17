import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const OwnerOfferList = () => {
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
                const appliedApplications = response.data.filter(app => app.status === 'Offered');
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
                (filters.companyname ? application.companyname.toLowerCase().includes(filters.companyname.toLowerCase()) : true)
            );
        });
        setFilteredApplications(filtered);
    }, [filters, applications]);

    const handleReject = async (applicationId) => {
        try {
            await axios.patch(`http://localhost:8081/api/ownerapplications/${applicationId}`, { status: 'Rejected' });
            const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                params: { name },
            });
            const appliedApplications = response.data.filter(app => app.status === 'Offered');
            setApplications(appliedApplications);
            setFilteredApplications(appliedApplications);
        } catch (error) {
            setError('Error rejecting application');
        }
    };

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
                                                <th className="px-6 py-3 text-left">Resume</th>
                                                <th className='px-6 py-3 text-left'>Reject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredApplications.map((application) => (
                                                <tr key={application._id} className="border-b hover:bg-gray-100">
                                                    <td className="px-6 py-4 text-blue-900">{application.companyname}</td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`/user/${application.userId}`} 
                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                        >
                                                            View User
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">{application.jobTitle}</td>
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
                                                    <td className="px-6 py-4">
                                                        <button
                                                            className='bg-red-500 p-2 text-left rounded-lg text-white font-semibold'
                                                            onClick={() => handleReject(application._id)}>REJECT</button>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 mt-4">No applied jobs found.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
