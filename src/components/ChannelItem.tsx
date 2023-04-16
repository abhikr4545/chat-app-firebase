import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useAddToChannelMemberArray from "../hooks/useAddToChannelMemberArray";
import { useAuth } from "../context/AuthContext";
import useGetUserName from "../hooks/useGetUserName";

interface ChannelItemProps {
  link: string,
  name: string,
  docId: string
}

const ChannelItem: React.FC<ChannelItemProps> = ({ link, name, docId }) => {

  const [channelIcon, setChannelIcon] = useState<string>("");
  const { addMember } = useAddToChannelMemberArray();
  const { user } = useAuth();
  const { userName } = useGetUserName(user?.email, "users");

  const displayName = () => {
    const nameArray: string[] = name.split(" ");
    if (nameArray.length == 1) {
      setChannelIcon(nameArray[0][0])
    } else if(nameArray.length > 1){
      setChannelIcon(`${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`)
    }
  }

  useEffect(() => {
    displayName()
  }, [])

  const handleAddMember = async () => {
    try {
      await addMember(docId, `${userName}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article onClick={handleAddMember} className="font-noto flex items-center cursor-pointer">
      <Link to={link} className="flex items-center justify-center">
        <div className="h-[42px] w-[42px] bg-sidebar-color text-lg flex items-center justify-center font-semibold text-white rounded-lg uppercase">
          {channelIcon}
        </div>
        <div className="font-bold text-channel-name uppercase ml-4 text-ellipsis">
          {name}
        </div>
      </Link>
    </article>
  )
}

export default ChannelItem