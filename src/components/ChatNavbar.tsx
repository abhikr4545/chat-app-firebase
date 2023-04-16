import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { GiHamburgerMenu } from "react-icons/gi";

const ChatNavbar = () => {

  const { openSidebar } = useContext(SidebarContext);

  return (
    <div className="sticky w-full h-[60px] flex items-center bg-sidebar-color shadow-nav-shadow px-4 md:px-12">
      <GiHamburgerMenu className="w-4 h-4 text-white md:hidden" onClick={() => openSidebar()} />
      <h1 className="font-noto text-white font-bold text-lg ml-4 md:ml-0">FRONT END CHANNEL</h1>
    </div>
  )
}

export default ChatNavbar