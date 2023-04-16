import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoSend } from "react-icons/io5";

import useAddMessageToGroup from '../hooks/useAddMessageToGroup';

const ChatInput = () => {

  const [message, setMessage] = useState<string>("");
  const { addMessage } = useAddMessageToGroup();
  const { id } = useParams();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("")
    await addMessage(message, `${id}`);
  }

  return (
    <form onSubmit={handleSendMessage} className='px-4 md:px-12 mt-4'>
      <div className="flex items-center justify-center h-[52px] px-2 rounded-lg bg-input-background">
        <input type="text" value={message} placeholder="Type a message here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          className="placeholder:text-sm placeholder:font-medium placeholder:text-message-detail-color bg-input-background text-white w-4/5 md:w-full outline-none"
        />
        <button className="bg-send w-10 h-10 rounded-lg ml-4 flex items-center justify-center md:cursor-pointer">
          <IoSend className="text-white w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

export default ChatInput