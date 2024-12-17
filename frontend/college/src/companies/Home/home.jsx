
import benefitsImage from "../assets/ben.webp";
import successImage from "../assets/success.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
export const OwnerHomePage = () => {
  
  return (
    <>
      <div className="flex mt-24">
        <div className="p-20 flex flex-col justify-center text-justify">
          <h1 className="font-semibold text-3xl">Employee Benefits</h1>
          <p className="font-thin text-xl pt-2">
            Discover the comprehensive benefits package that supports your 
            personal and professional growth.
          </p>
        </div>
        <img src={benefitsImage} className="w-1/2" alt="Employee Benefits" />
      </div>

      <div className="flex">
        <img src={successImage} className="w-1/2" alt="Success Stories" />
        <div className="p-20 flex flex-col justify-center text-justify">
          <h1 className="font-semibold text-3xl">Success Stories</h1>
          <p className="font-thin text-xl pt-2">
            Hear from our employees who’ve built successful careers with us.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-20 py-10 bg-gray-50">
        <div className="flex flex-col items-center text-center p-10">
          <h2 className="font-bold text-2xl">Streamlined Process</h2>
          <p className="text-gray-600 mt-2 text-xl">
            Our hiring process ensures fairness and efficiency at every step.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-10">
          <h2 className="font-bold text-2xl">Growth Opportunities</h2>
          <p className="text-gray-600 mt-2 text-xl">
            We provide unmatched career growth and learning opportunities.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-10">
          <h2 className="font-bold text-2xl">Comprehensive Benefits</h2>
          <p className="text-gray-600 mt-2 text-xl">
            Enjoy a range of perks designed for your well-being.
          </p>
        </div>
      </div>

      <footer>
        <div className='flex flex-row justify-between bg-gray-400'>
          <div className='flex flex-col pl-8'>
            <ul className='flex pt-10 '>
              <li className='underline text-blue-700 pr-5 cursor-pointer'>About</li>
              <li className='underline text-blue-700 pr-5 cursor-pointer'>Contact</li>
              <li className='underline text-blue-700 pr-5 cursor-pointer'>Terms Of Use</li>
            </ul>
            <p className='pt-2 pb-10 font-light text-sm'>© SivaKavindra@2024. All Rights Reserved.</p>
          </div>
          <div className='flex justify-center items-center pr-8'>
              <FontAwesomeIcon icon={faFacebook} className="text-4xl text-blue-700 p-5 hover:text-blue-600 transition duration-300" />
              <FontAwesomeIcon icon={faTwitter} className="text-4xl text-blue-700 p-5 hover:text-blue-400 transition duration-300" />
              <FontAwesomeIcon icon={faInstagram} className="text-4xl text-blue-700 p-5 hover:text-pink-600 transition duration-300" />
          </div>
        </div>
      </footer>
    </>
  );
};
