import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ScehduleApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filters, setFilters] = useState({
        jobTitle: '',
        companyname: '',
        status: '',
        date: '',
        time: '',
    });
    const name = localStorage.getItem('name');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                    params: { name },
                });
                const appliedApplications = response.data.filter(app => app.status === 'Scheduled');
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
            const updatedDate = new Date(application.updatedAt);
            const formattedDate = updatedDate.toLocaleDateString('en-GB'); 
            const formattedTime = updatedDate.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });

            return (
                (filters.jobTitle ? application.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()) : true) &&
                (filters.companyname ? application.companyname.toLowerCase().includes(filters.companyname.toLowerCase()) : true) &&
                (filters.status ? application.status.toLowerCase().includes(filters.status.toLowerCase()) : true) &&
                (filters.date ? formattedDate.includes(filters.date) : true) && 
                (filters.time ? formattedTime.includes(filters.time) : true)
            );
        });
        setFilteredApplications(filtered);
    }, [filters, applications]);

    const handleReject = async (applicationId,userId,title,company) => {
        try {
            await axios.patch(`http://localhost:8081/api/ownerapplications/${applicationId}`, { status: 'Rejected' });
            const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                params: { name },
            });
            await sendRejectionEmail(userId,title,company);
            const appliedApplications = response.data.filter(app => app.status === 'Scheduled');
            setApplications(appliedApplications); 
            setFilteredApplications(appliedApplications); 
            setLoading(false); 
        } catch (error) {
            setError('Error rejecting application');
        }
    };

    const handleRe = async (applicationId,userId,title,company) => {
        try {
            await axios.patch(`http://localhost:8081/api/ownerapplications/${applicationId}`, { status: 'Offered' });
            const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                params: { name },
            });
            await sendConfirmationEmail(userId,title,company);
            const appliedApplications = response.data.filter(app => app.status === 'Scheduled');
            setApplications(appliedApplications); 
            setFilteredApplications(appliedApplications); 
            setLoading(false); 
        } catch (error) {
            setError('Error rejecting application');
        }
    };

    const sendConfirmationEmail = async (userId,title,company) => {

        try {
            const userEmailResponse = await axios.get(`http://localhost:8081/api/get-user-email/${userId}`);
            const ownerEmail = userEmailResponse.data.email;
            const response = await fetch('http://localhost:8081/send-confirmation-offered', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: ownerEmail,title,company })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Email sent successfully:', data.message);
            }
            else {
                console.error('Failed to send email:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const sendRejectionEmail = async (userId,title,company) => {

        try {
            const userEmailResponse = await axios.get(`http://localhost:8081/api/get-user-email/${userId}`);
            const ownerEmail = userEmailResponse.data.email;
            const response = await fetch('http://localhost:8081/send-confirmation-rejected', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: ownerEmail,title,company })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Email sent successfully:', data.message);
            }
            else {
                console.error('Failed to send email:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error sending email:', error);
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
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Date</label>
                            <input
                                type="text"
                                name="date"
                                value={filters.date}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Time</label>
                            <input
                                type="text"
                                name="time"
                                value={filters.time}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="hh:mm am/pm"
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
                                                <th className="px-6 py-3 text-left">User Name</th>
                                                <th className="px-6 py-3 text-left">Job Title</th>
                                                <th className="px-6 py-3 text-left">Status</th>
                                                <th className="px-6 py-3 text-left">Date</th>
                                                <th className="px-6 py-3 text-left">Time</th>
                                                <th className='px-6 py-3 text-left'>Reject</th>
                                                <th className='px-6 py-3 text-left'>Accept</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredApplications.map((application) => (
                                                <tr key={application._id} className="border-b hover:bg-gray-100">
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`/user/${application.userId}`} 
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            View User
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">{application.jobTitle}</td>
                                                    <td className="px-6 py-4">{application.status}</td>
                                                    <td className="px-6 py-4">
                                                        {new Date(application.updatedAt).toLocaleDateString('en-GB')} 
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {new Date(application.updatedAt).toLocaleString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true, 
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            className='bg-red-500 p-2 text-left rounded-lg text-white font-semibold'
                                                            onClick={() => handleReject(application._id,application.userId,application.jobTitle,application.companyname)}>REJECT</button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            className='bg-green-500 p-2 text-left rounded-lg text-white font-semibold'
                                                            onClick={() => handleRe(application._id,application.userId,application.jobTitle,application.companyname)}>ACCEPT</button>
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
