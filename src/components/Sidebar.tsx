import { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import Channels from './Channels';
import CurrentUser from './CurrentUser';
import Navbar from './Navbar';

import useClickOutside from '../hooks/useClickOutside';

const Sidebar = () => {

  const { isOpen, closeSidebar } = useContext(SidebarContext);
  
  let sideBarRef = useClickOutside(closeSidebar);

  return (
    <aside ref={sideBarRef} className={`h-screen absolute z-40 top-0 ${isOpen ? "left-0" : "-left-full"} w-[90%] bg-sidebar-nav-color transition-all ease-in-out duration-300 md:static md:z-0 md:w-[350px] flex flex-col justify-between`}>
      <div>
        <Navbar />
        <Channels />
      </div>
      <CurrentUser />
    </aside>
  )
}

export default Sidebar