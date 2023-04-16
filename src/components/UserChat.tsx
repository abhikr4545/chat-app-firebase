import useGetUserName from "../hooks/useGetUserName";

const UserChat = (props: any) => {

  const { userName } = useGetUserName(props.sendBy, "users")
  const timestamp = props.time.toDate().toLocaleDateString() + " " + props.time.toDate().toLocaleTimeString();

  return (
    <article className='font-noto flex max-w-fit justify-center px-5 gap-6 py-5'>
      <div className='overflow-hidden h-11 mt-[6px] min-w-[44px]'>
        <div className='w-[42px] h-[42px] bg-sidebar-nav-color flex justify-center items-center rounded-lg'>
          {userName.charAt(0).toLocaleUpperCase()}
        </div>
      </div>
      <div className='flex-wrap'>
        <div className='flex items-center'>
          <h3 className='text-lg font-bold text-message-detail-color'>{userName}</h3>
          <h3 className='text-message-detail-color pl-4 pt-[2px] text-sm'>{timestamp}</h3>
        </div>
        <p className='font-medium text-lg text-chat-text-color md:max-w-[880px]'>
          {props.message}
        </p>
      </div>
    </article>
  )
}

export default UserChat