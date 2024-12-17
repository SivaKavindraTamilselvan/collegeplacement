import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const InterviewApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [userId,setUserId]=useState();
    const [filters, setFilters] = useState({
        jobTitle: '',
        companyname: '',
        status: '',
    });
    const [scheduleData, setScheduleData] = useState({
        applicationId: '',
        date: '',
        time: '',
        type: 'Offline',
    });
    const name = localStorage.getItem('name');
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                    params: { name },
                });

                console.log('API Response:', response.data); // Debugging the response
                const appliedApplications = response.data.filter(app => app.status === 'Interview');
                setApplications(appliedApplications);
                setFilteredApplications(appliedApplications);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setLoading(false);
            }
        };
        
        

        if (name) {
            fetchApplications();
        } else {
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

    const handleScheduleClick = (applicationId,userId) => {
        setScheduleData({ ...scheduleData, applicationId });
        setUserId(userId);
        setIsModalOpen(true);
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8081/api/ownerapplica/${scheduleData.applicationId}`, {
                schedule: {
                    date: scheduleData.date,
                    time: scheduleData.time,
                    type: scheduleData.type,
                },
                status: 'Scheduled',
            });
            await sendConfirmationEmail(userId,scheduleData.date,scheduleData.time);
    
            setIsModalOpen(false);
                const response = await axios.get('http://localhost:8081/api/ownerapplications', {
                params: { name },
            });
            const appliedApplications = response.data.filter(app => app.status === 'Interview');
                setApplications(appliedApplications);
                setFilteredApplications(appliedApplications);
        } catch (error) {
            console.error('Error assigning schedule:', error);
        }
    };
    
    const sendConfirmationEmail = async (userId,date,time) => {
        
        try {
            const userEmailResponse = await axios.get(`http://localhost:8081/api/get-user-email/${userId}`);
            const ownerEmail = userEmailResponse.data.email;
            const response = await fetch('http://localhost:8081/send-confirmation-interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: ownerEmail, date,time})
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
                    </div>
                </aside>

                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="text-center text-gray-600">Loading...</div>
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
                                                <th className="px-6 py-3 text-left">Actions</th>
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
                                                            className="bg-blue-500 text-white p-2 rounded-md"
                                                            onClick={() => handleScheduleClick(application._id,application.userId)}
                                                        >
                                                            Assign Schedule
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {isModalOpen && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-50"
                                                onClick={() => setIsModalOpen(false)}
                                            ></div>

                                            <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3 z-10">
                                                <h2 className="text-xl font-bold mb-4">Assign Interview Schedule</h2>
                                                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                                                    <div>
                                                        <label className="block text-gray-700">Date</label>
                                                        <input
                                                            type="date"
                                                            value={scheduleData.date}
                                                            onChange={(e) =>
                                                                setScheduleData({ ...scheduleData, date: e.target.value })
                                                            }
                                                            className="border border-gray-300 p-2 rounded-md w-full"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">Time</label>
                                                        <input
                                                            type="time"
                                                            value={scheduleData.time}
                                                            onChange={(e) =>
                                                                setScheduleData({ ...scheduleData, time: e.target.value })
                                                            }
                                                            className="border border-gray-300 p-2 rounded-md w-full"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">Type</label>
                                                        <select
                                                            value={scheduleData.type}
                                                            onChange={(e) =>
                                                                setScheduleData({ ...scheduleData, type: e.target.value })
                                                            }
                                                            className="border border-gray-300 p-2 rounded-md w-full"
                                                        >
                                                            <option value="Offline">Offline</option>
                                                            <option value="Online">Online</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex justify-end space-x-4">
                                                        <button
                                                            type="button"
                                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                                            onClick={() => setIsModalOpen(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            
                                                            type="submit"
                                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
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
