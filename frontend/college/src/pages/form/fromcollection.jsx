import React, { useState } from "react";

export const Formcollection = () => {
    const [form, setForm] = useState({
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "",
        college: "ABC University",
        degree: "B.Tech",
        branch: "Computer Science",
        graduationYear: "",
        resume: null,
        coverLetter: null,
        transcript: null,
        jobTitle: "Software Engineer",
        jobId: "JOB12345",
        expectedSalary: "",
        availability: "",
        statementOfPurpose: "",
        skills: [],
        linkedIn: "",
        agreement: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setForm({ ...form, [name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!form.phone || !form.expectedSalary || !form.availability) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("Form submitted:", form);
    };

    const handleDraft = () => {
        // Save form as draft logic here
        console.log("Form saved as draft:", form);
    };

    const handleCancel = () => {
        // Navigate back to job listings
        console.log("Form cancelled");
    };

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Application Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Academic Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">College/University Name</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={form.college}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={form.degree}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Branch/Major</label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={form.branch}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Year of Graduation</label>
                                <select
                                    name="graduationYear"
                                    value={form.graduationYear}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                >
                                    <option value="">Select Year</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Upload Documents */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Documents</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Resume (PDF, max 2MB)</label>
                                <input
                                    type="file"
                                    name="resume"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Cover Letter (Optional)</label>
                                <input
                                    type="file"
                                    name="coverLetter"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Transcript/Marksheet (Optional)</label>
                                <input
                                    type="file"
                                    name="transcript"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job-Specific Information */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Job-Specific Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={form.jobTitle}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Expected Salary</label>
                                <input
                                    type="text"
                                    name="expectedSalary"
                                    value={form.expectedSalary}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Availability for Joining</label>
                                <input
                                    type="date"
                                    name="availability"
                                    value={form.availability}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
                        <div>
                            <label className="block text-gray-700">Statement of Purpose</label>
                            <textarea
                                name="statementOfPurpose"
                                value={form.statementOfPurpose}
                                onChange={handleChange}
                                rows="4"
                                className="w-full p-3 border rounded-md"
                                maxLength="500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">LinkedIn Profile</label>
                            <input
                                type="url"
                                name="linkedIn"
                                value={form.linkedIn}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleDraft}
                        className="p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        Save as Draft
                    </button>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Submit Application
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
