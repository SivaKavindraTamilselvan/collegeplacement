import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Addjob } from '../../companies/add/c';
export const OwnerNavbar = () => {
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/');
    };

    const togglePopup = () => {
        setShowPopup(prevState => !prevState); 
    };

    return (
        <>
            <nav className='bg-white shadow-md fixed top-0 left-0 w-full z-10'>
                <div className='flex items-center justify-between md:justify-around p-4'>
                    <div className='text-2xl font-bold text-green-600 cursor-pointer md:w-auto w-full'>
                        <span>COLLEGE</span><span className='text-black'>_PLACEMENT</span>
                    </div>

                    <ul className='hidden md:flex font-light sentencecase items-center gap-8' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <li>
                            <Link to="/company/home" className="py-7 px-3 inline-block">Home</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/list" className="py-7 px-3 inline-block">Jobs List</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/applied" className="py-7 px-3 inline-block">Applied Jobs</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/interview" className="py-7 px-3 inline-block">Interview</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/schedule" className="py-7 px-3 inline-block">Scheduled</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/offer" className="py-7 px-3 inline-block">Offered</Link>
                        </li>
                        <li>
                            <Link to="/company/jobs/history" className="py-7 px-3 inline-block">History</Link>
                        </li>
                        
                        <li>
                            <button
                                onClick={togglePopup} 
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add Job
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {showPopup && <Addjob togglePopup={togglePopup} />}
        </>
    );
};
