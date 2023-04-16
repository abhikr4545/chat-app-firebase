import { useParams } from 'react-router-dom';
import Loader from './Loader';
import useGetDataFromFirebase from '../hooks/useGetDataFromFirebase';
import { v4 as uuid } from 'uuid';

const ChannelMembersList = () => {
  
  const { id } = useParams();
  const { loading, data } = useGetDataFromFirebase(`${id}`);
  
  if(loading) return <Loader />

  return (
    <ul className="font-noto flex flex-col h-[calc(100vh-330px)] mt-4 overflow-y-scroll overflow-x-hidden">
      <h3 className="text-lg font-bold text-white">MEMBERS</h3>
      {
        data.members?.map((member: string, index: number) => (
          <li className="font-bold text-channel-name uppercase text-ellipsis" key={uuid()}>
            <div className='flex items-center my-2'>
              <div className='w-[42px] h-[42px] bg-sidebar-color flex justify-center items-center rounded-lg'>
                {member.charAt(0)}
              </div>
              <h4 className='font-noto font-bold text-lg ml-4'>{ member }</h4>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default ChannelMembersList