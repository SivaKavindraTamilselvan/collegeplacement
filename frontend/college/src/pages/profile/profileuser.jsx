import React, { useState, useEffect } from 'react';
import axios from 'axios';  
export const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        profilePicture: null,
        academicDetails: [],
    });

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userId');  
                const response = await axios.get(`http://localhost:8081/api/profile/${userId}`);

                if (response.status === 200) {
                    setProfile(response.data);  
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleAcademicChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAcademicDetails = [...profile.academicDetails];
        updatedAcademicDetails[index] = {
            ...updatedAcademicDetails[index],
            [name]: value,
        };
        setProfile({
            ...profile,
            academicDetails: updatedAcademicDetails,
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setProfile({
            ...profile,
            [name]: e.target.files[0],
        });
    };

    const handleSave = async () => {
        const userId = localStorage.getItem('userId'); 
        const updatedProfile = {
            ...profile,
        };

        try {
            const response = await axios.put(`/api/profile/${userId}`, updatedProfile);

            if (response.status === 200) {
                console.log('Profile Saved:', response.data);
                setIsEditable(false);
            }
        } catch (err) {
            console.error('Error saving profile:', err);
        }
    };

    const handleCancel = () => {
        setIsEditable(false);
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <div className="flex justify-between mb-6">
                <div className="relative">
                    <img
                        src={profile.profilePicture ? URL.createObjectURL(profile.profilePicture) : 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300"
                    />
                    {isEditable && (
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleFileChange}
                            className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
                        />
                    )}
                </div>
                <button type="button" onClick={handleEditClick} className="text-blue-600 font-semibold">
                    Edit
                </button>
            </div>

            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    {isEditable ? (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                        />
                    ) : (
                        <p className="w-full p-3 border rounded-md">{profile.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        readOnly
                        className="w-full p-3 border rounded-md bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    {isEditable ? (
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                        />
                    ) : (
                        <p className="w-full p-3 border rounded-md">{profile.phone}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    {isEditable ? (
                        <textarea
                            id="address"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                            rows="4"
                        />
                    ) : (
                        <p className="w-full p-3 border rounded-md">{profile.address}</p>
                    )}
                </div>

                {profile.academicDetails.map((item, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold text-gray-800">Academic Details</h3>
                        {isEditable ? (
                            <>
                                <input
                                    type="text"
                                    name="degree"
                                    value={item.degree}
                                    onChange={(e) => handleAcademicChange(index, e)}
                                    className="w-full p-3 border rounded-md mb-2"
                                    placeholder="Degree"
                                />
                                <input
                                    type="text"
                                    name="university"
                                    value={item.university}
                                    onChange={(e) => handleAcademicChange(index, e)}
                                    className="w-full p-3 border rounded-md mb-2"
                                    placeholder="University"
                                />
                                <input
                                    type="text"
                                    name="graduationYear"
                                    value={item.graduationYear}
                                    onChange={(e) => handleAcademicChange(index, e)}
                                    className="w-full p-3 border rounded-md mb-2"
                                    placeholder="Graduation Year"
                                />
                                <input
                                    type="text"
                                    name="major"
                                    value={item.major}
                                    onChange={(e) => handleAcademicChange(index, e)}
                                    className="w-full p-3 border rounded-md mb-2"
                                    placeholder="Major"
                                />
                            </>
                        ) : (
                            <>
                                <p className="w-full p-3 border rounded-md mb-2">{item.degree}</p>
                                <p className="w-full p-3 border rounded-md mb-2">{item.university}</p>
                                <p className="w-full p-3 border rounded-md mb-2">{item.graduationYear}</p>
                                <p className="w-full p-3 border rounded-md mb-2">{item.major}</p>
                            </>
                        )}
                    </div>
                ))}

                {isEditable ? (
                    <div className="flex space-x-4">
                        <button type="button" onClick={handleSave} className="p-2 px-4 bg-blue-600 text-white rounded-md">
                            Save
                        </button>
                        <button type="button" onClick={handleCancel} className="p-2 px-4 bg-gray-300 text-gray-700 rounded-md">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <button type="button" onClick={handleEditClick} className="p-2 px-4 bg-green-600 text-white rounded-md">
                            Edit
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};
