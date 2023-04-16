import { useRef, useState, useEffect } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useGetUserName from '../hooks/useGetUserName';

const CurrentUser = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const { userName } = useGetUserName(user?.email, "users");
  
  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
      navigate("/login")

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <article ref={dropdownRef} className='flex relative items-center justify-between bg-sidebar-nav-color text-channel-name 
    font-noto font-bold text-lg h-[60px] md:w-[350px] shadow-nav-shadow px-8'>
      <div className='flex items-center'>
        <div className='w-[42px] h-[42px] bg-sidebar-color flex justify-center items-center rounded-lg'>
          {userName.charAt(0).toLocaleUpperCase()}
        </div>
        <h4 className='font-noto font-bold text-lg ml-4'>{ userName }</h4>
      </div>
      <div>
        <FiChevronDown className='h-6 w-6 md:cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className={`absolute bottom-14 right-9 h-44 w-48 bg-sidebar-color rounded-lg ${isOpen ? "" : "hidden"} flex flex-col justify-between py-6 px-4`}>
        <div className="flex items-center cursor-pointer">
          <ImExit className="h-5 w-5 mr-2" />
          <h3>Exit Channel</h3>
        </div>
        <div className="bg-input-background h-0.5 w-40 mx-auto" />
        <div onClick={handleLogout} className="flex items-center text-logout cursor-pointer">
          <AiOutlineLogout className="h-5 w-5 mr-2" />
          <h3>Logout</h3>
        </div>
      </div>
    </article>
  )
}

export default CurrentUser