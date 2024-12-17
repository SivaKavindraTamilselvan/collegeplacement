import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Addcompany } from '../../main/add';
export const PlacementNavbar = () => {
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
                            <Link to="/placement/home" className="py-7 px-3 inline-block">Home</Link>
                        </li>
                        <li>
                            <Link to="/placement/jobs/list" className="py-7 px-3 inline-block">Jobs List</Link>
                        </li>
                        <li>
                            <Link to="/placement/jobs/appliedlist" className="py-7 px-3 inline-block">Applied Jobs</Link>
                        </li>
                        <li>
                            <Link to="/placement/jobs/companylist" className="py-7 px-3 inline-block">Company List</Link>
                        </li>
                        <li>
                            <button
                                onClick={togglePopup} 
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add Company
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

            {showPopup && <Addcompany togglePopup={togglePopup} />}
        </>
    );
};
