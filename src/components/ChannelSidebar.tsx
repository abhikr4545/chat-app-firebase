import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { SidebarContext } from "../context/SidebarContext";
import useClickOutside from "../hooks/useClickOutside";
import { IoIosArrowBack } from "react-icons/io";
import { channelList, ChannelProps } from "../data/ChannelList";
import ChannelDetails from "./ChannelDetails";
import CurrentUser from "./CurrentUser";

const Channel = () => {
  const [description, setDescription] = useState("")
  const { isOpen, closeSidebar } = useContext(SidebarContext);

  let sideBarRef = useClickOutside(closeSidebar);
  const { id } = useParams();

  const getChannelData = async () => {
    const docRef = doc(db, "groups", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDescription(docSnap.data().description);
    }
  }

  useEffect(() => {
    getChannelData()
  }, [])

  const channel: ChannelProps | undefined = channelList.find((item: ChannelProps) => String(item.id) === id);

  return (
    <aside ref={sideBarRef} className={`h-screen absolute z-40 top-0 ${isOpen ? "left-0" : "-left-full"} w-[90%] bg-sidebar-nav-color transition-all ease-in-out duration-300 md:static md:z-0 md:w-[350px] flex flex-col justify-between`}>
      <div>
        <nav className="flex sticky items-center bg-sidebar-nav-color font-noto font-bold text-lg h-[60px] md:w-[350px] shadow-2xl">
          <Link to="/" onClick={closeSidebar}>
            <div className="flex items-center gap-2 ml-6">
              <div className="h-8 w-8 bg-background-color flex items-center justify-center rounded-lg md:cursor-pointer">
                <IoIosArrowBack className="text-white" height={`24px`} width={`24px`} />
              </div>
            </div>
          </Link>
          <div className="text-white ml-3 text-lg">
            All CHANNELS
          </div>
        </nav>
        <ChannelDetails channelName={channel?.name} description={description} />
      </div>
      <CurrentUser />
    </aside>
  )
}

export default Channel