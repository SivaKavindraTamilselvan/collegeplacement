import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { OwnerNavbar } from '../../components/NavBar/ownernavbar';

export const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/profile/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user details');
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserDetails();
        } else {
            setError('User ID not found');
            setLoading(false);
        }
    }, [userId]);

    return (
        <>
        <OwnerNavbar/>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md mb-8">
                <h1 className="text-xl font-bold">User Details</h1>
            </div>
            <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="text-center text-gray-600">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">User Information</h2>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
        </>
    );
};

