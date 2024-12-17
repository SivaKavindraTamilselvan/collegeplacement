import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const [statusCounts, setStatusCounts] = useState({
        Offered: 0,
        Interviewed: 0,
        Scheduled: 0,
        Rejected: 200,
    });

    useEffect(() => {
        const fetchJobStatusData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/job-status');
                const data = await response.json();
                setStatusCounts(data);
            } catch (error) {
                console.error('Error fetching job status data:', error);
            }
        };

        fetchJobStatusData();
    }, []);

    const chartData = {
        labels: ['Offered', 'Interviewed', 'Scheduled', 'Rejected'],
        datasets: [
            {
                label: 'Job Status Count',
                data: [
                    statusCounts['Offered'],
                    statusCounts['Interviewed'],
                    statusCounts['Scheduled'],
                    statusCounts['Rejected'],
                ],
                backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#F44336'],
                borderColor: ['#388E3C', '#FF9800', '#1976D2', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="mt-32 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Job Application Status</h2>
            <div className="flex justify-center">
                <Bar data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

