import ChatInput from "./ChatInput"
import ChatNavbar from "./ChatNavbar"
import Chats from "./Chats"

const ChatsContainer = () => {  
  return (
    <section className="h-screen w-screen md:w-[calc(100vw-350px)] bg-sidebar-color">
      <ChatNavbar />
      <Chats />
      {/* <ChatInput /> */}
    </section>
  )
}

export default ChatsContainer