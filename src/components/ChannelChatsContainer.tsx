import ChannelNav from './ChannelNav';
import ChannelSidebar from "./ChannelSidebar";
import ChannelChats from './ChannelChats';
import ChatInput from './ChatInput';

const ChannelChatsContainer = () => {

  return (
    <section className="h-screen w-screen md:w-screen bg-sidebar-color flex">
      <ChannelSidebar />
      <div className="w-full">
        <ChannelNav />
        <ChannelChats />
        <ChatInput />
      </div>
    </section>
  )
}

export default ChannelChatsContainer