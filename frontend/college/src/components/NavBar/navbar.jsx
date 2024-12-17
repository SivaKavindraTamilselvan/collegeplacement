import { Link } from 'react-router-dom';
import { NavLinks } from '../NavBar/navlink';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    

    const handleLogout = () => {
        localStorage.removeItem('userId');

        navigate('/');
    };



    return (
        <nav className='bg-white shadow-md fixed top-0 left-0 w-full z-10'>
            <div className='flex items-center justify-between md:justify-around p-4'>
                <div className='text-2xl font-bold text-green-600 cursor-pointer md:w-auto w-full'>
                    <span>COLLEGE</span><span className='text-black'>_PLACEMENT</span>
                </div>

                <ul className='hidden md:flex font-light sentencecase items-center gap-8' style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <li>
                        <Link to="/user/home" className="py-7 px-3 inline-block">Home</Link>
                    </li>
                    <li>
                        <Link to="/user/jobs" className="py-7 px-3 inline-block">Companies</Link>
                    </li>
                    <li>
                        <Link to="/user/jobs/applied" className="py-7 px-3 inline-block">Applied Job</Link>
                    </li>
                    <li>
                        <Link to="/user/jobs/interview" className="py-7 px-3 inline-block">Interview</Link>
                    </li>
                    <NavLinks/>
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
    );
};
