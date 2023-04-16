import { useState, useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { BiPlus } from "react-icons/bi";
import AddChannelModal from "../modals/AddChannelModal";


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { closeSidebar } = useContext(SidebarContext);

  const handleOpenModal = () => {
    closeSidebar();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <nav className="flex sticky items-center justify-between bg-sidebar-nav-color font-noto font-bold text-lg h-[60px] md:w-[350px] shadow-2xl px-8">
      <div className="text-white">
        CHANNELS
      </div>
      <div className="flex items-center gap-2 ml-6">
        <div onClick={handleOpenModal} className="h-8 w-8 bg-background-color flex items-center justify-center rounded-lg md:cursor-pointer">
          <BiPlus className="text-white" height={`24px`} width={`24px`} />
        </div>
      </div>
      {showModal && (<AddChannelModal onClose={handleCloseModal} />)}
    </nav>
  )
}

export default Navbar