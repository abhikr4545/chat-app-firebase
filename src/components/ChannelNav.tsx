import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { SidebarContext } from "../context/SidebarContext";
import { GiHamburgerMenu } from 'react-icons/gi';
import Loader from "./Loader";
import useGetDataFromFirebase from "../hooks/useGetDataFromFirebase";


const ChannelNav = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { id } = useParams();

  const { loading, data } = useGetDataFromFirebase(`${id}`);

  if(loading) return <Loader />

  return (
    <nav className="">
      <div className="flex items-center h-[60px] sticky w-full bg-sidebar-color shadow-nav-shadow px-4 md:px-12">
        <GiHamburgerMenu className="w-4 h-4 text-white md:hidden" onClick={() => openSidebar()} />
        <h1 className="font-noto text-white font-bold text-lg ml-4 md:ml-0">
          {data.name?.toLocaleUpperCase()}
        </h1>
      </div>
    </nav>
  )
}

export default ChannelNav