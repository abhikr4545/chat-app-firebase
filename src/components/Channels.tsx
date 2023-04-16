import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { CgSearch } from "react-icons/cg";
import { db } from '../firebase';
import ChannelList from './ChannelList';
import Loader from './Loader';

const Channels = () => {

  const [searchValue, setSearchValue] = useState<string>("")

  const [loading, setLoading] = useState(false);
  const [channelList, setChannelList] = useState<any>([]);
  const [filteredChannelList, setFilteredChannelList] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const list: any = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, data: doc.data() })
      });
      setChannelList(list);
      setFilteredChannelList(list);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearchValue(inputValue);

    if (inputValue === "") {
      setFilteredChannelList(channelList)
    } else {
      const filteredList = channelList?.filter((channel: any) => (
        `${channel.data.name}`.toLowerCase().includes(inputValue.toLowerCase())
      ))

      setFilteredChannelList(filteredList)
    }
  } 

  if (loading) return <Loader />;

  return (
    <div className="md:w-[350px] mt-6 md:h-[calc(100vh-149px)] px-8 bg-sidebar-nav-color text-white font-noto">
        {/* Search Bar Start */}
      <div className="flex items-center bg-sidebar-color mx-auto h-12 px-4 rounded-lg">
          <CgSearch className="text-white w-6 h-6" />
        <input type="text" placeholder="Search" className='bg-sidebar-color w-full outline-none ml-3 placeholder:text-sm placeholder:font-medium' value={searchValue}
          onChange={ handleSearch } />
      </div>
      {/* Search Bar End */}
      {/* Channel List Start */}
      <ChannelList channelList={filteredChannelList} />
      {/* Channel List End */}
    </div>
  )
}

export default Channels