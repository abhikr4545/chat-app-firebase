const Chats = () => {

  return (
    <div id="style-3" className="w-full h-[calc(100vh-150px)] bg-sidebar-color overflow-y-scroll px-4 md:px-8 flex flex-col items-center">
      <div className="text-white bg-sidebar-nav-color rounded-lg h-[100px] px-3 md:px-0 w-[300px] text-xl font-semibold md:w-[600px] flex justify-center items-center md:text-2xl md:font-bold text-center mt-5">
        Welcome to the group chat application.
      </div>
      <div className="text-white bg-sidebar-nav-color rounded-lg h-[100px] px-3 md:px-0 w-[300px] text-xl font-semibold md:w-[600px] flex justify-center items-center md:text-2xl md:font-bold text-center mt-5">
        To add a channel click on the add button to create a channel.
      </div>
      <div className="text-white bg-sidebar-nav-color rounded-lg h-[100px] px-3 md:px-0 w-[300px] text-xl font-semibold md:w-[600px] flex justify-center items-center md:text-2xl md:font-bold text-center mt-5">
        To post message in existing channel click on the channel and post messages.
      </div>
    </div>
  )
}

export default Chats