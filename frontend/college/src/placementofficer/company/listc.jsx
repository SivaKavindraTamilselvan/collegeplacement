import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CompanyJobList = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [applicationDetails, setApplicationDetails] = useState({
        jobTitle: '',
        companyName: '',
    });


    const [filters, setFilter] = useState({
        companyName: '',
        jobTitle: '',
        jobLocation: '',
        jobType: '',
    });

    const jobTypeMapping = ["Full-time", "Part-time", "Internship", "Freelance"];
    const jobLocationMapping = ["Remote", "On-site", "Hybrid"];

    const itemsPerPage = 2;

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        const response = await axios.get('http://localhost:8081/api/companies');
        setCompanies(response.data);
        setFilteredCompanies(response.data);
    };

    useEffect(() => {
        const applyFilters = () => {
            let result = companies.map(company => {
                let filteredJobs = company.jobs;

                if (filters.jobTitle) {
                    filteredJobs = filteredJobs.filter(job =>
                        job.title.toLowerCase().includes(filters.jobTitle.toLowerCase())
                    );
                }

                if (filters.jobLocation) {
                    filteredJobs = filteredJobs.filter(job =>
                        job.location.toLowerCase().includes(filters.jobLocation.toLowerCase())
                    );
                }

                if (filters.jobType) {
                    filteredJobs = filteredJobs.filter(job => job.type === filters.jobType);
                }

                if (filteredJobs.length > 0) {
                    return { ...company, jobs: filteredJobs };
                }

                return null;
            });

            result = result.filter(company => company !== null);

            if (searchTerm) {
                result = result.filter(company =>
                    company.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredCompanies(result);
            setCurrentPage(1);
        };

        applyFilters();
    }, [filters, searchTerm, companies]);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < Math.ceil(filteredCompanies.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedCompanies = filteredCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);




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
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Search company..."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
                            <input type="text" value={filters.companyName} onChange={(e) => setFilter({ ...filters, companyName: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Search company..."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Title</label>
                            <input type="text" value={filters.jobTitle} onChange={(e) => setFilter({ ...filters, jobTitle: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Search job titles..."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Location</label>
                            <select value={filters.jobLocation} onChange={(e) => setFilter({ ...filters, jobLocation: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
                                <option value="">All Locations</option>
                                {jobLocationMapping.map(location => <option key={location}>{location}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Job Type</label>
                            <select value={filters.jobType} onChange={(e) => setFilter({ ...filters, jobType: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
                                <option value="">All Job Types</option>
                                {jobTypeMapping.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>

                        </div>
                    </div>
                </aside>
                <main className="flex-1">
                    {displayedCompanies.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="px-6 py-3 text-left font-semibold">Company Name</th>
                                        <th className="px-6 py-3 text-left font-semibold">Job Title</th>
                                        <th className="px-6 py-3 text-left font-semibold">Location</th>
                                        <th className="px-6 py-3 text-left font-semibold">Job Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedCompanies.map(company => (
                                        company.jobs.map((job, index) => (
                                            <tr key={company.id + job.id} className="hover:bg-gray-100 transition-colors">
                                                <td className="px-6 py-4 text-blue-900 font-semibold">{company.name}</td>
                                                <td className="px-6 py-4 text-blue-900 font-semibold">{job.title}</td>
                                                <td className="px-6 py-4 text-gray-700">{job.location}</td>
                                                <td className="px-6 py-4 text-gray-700">{job.type}</td>

                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mt-4">No companies or jobs found.</p>
                    )}

                    {filteredCompanies.length > 0 && (
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={() => handlePageChange('prev')}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md transition-opacity duration-200 hover:bg-blue-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {Math.ceil(filteredCompanies.length / itemsPerPage)}
                            </span>
                            <button
                                onClick={() => handlePageChange('next')}
                                disabled={currentPage === Math.ceil(filteredCompanies.length / itemsPerPage)}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md transition-opacity duration-200 hover:bg-blue-700 ${currentPage === Math.ceil(filteredCompanies.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>

            </div>


        </div>
    );
};
