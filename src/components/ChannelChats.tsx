import { useParams } from "react-router-dom";
import Chat from './Chat';
import UserChat from './UserChat';
import useGetChannelMessages from "../hooks/useGetChannelMessages";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

const ChannelChats = () => {
  
  const { id } = useParams();

  const { loading, data } = useGetChannelMessages(`${id}`);
  const { user } = useAuth()

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data?.messages]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (loading) return <Loader />
  
  return (
    <div ref={containerRef} id="style-3" className="w-full h-[calc(100vh-150px)] bg-sidebar-color overflow-y-scroll px-4 md:px-8">
      {
        data?.messages?.map((item: any) => (
          user?.email === item?.sendBy ?
          <Chat message={`${item?.message}`} sendBy={item?.sendBy} time={item?.sendAt} key={item?.messageId} /> :
          <UserChat message={`${item?.message}`} sendBy={item?.sendBy} time={item?.sendAt} key={item?.messageId} />
        ))
      }
    </div>
  )
}

export default ChannelChats