import ChannelItem from './ChannelItem'

const ChannelList: React.FC<any> = ({ channelList }) => {

  return (
    <div id="style-3" className="flex h-[calc(100%-100px)] flex-col md:h-[700px] gap-8 mt-8 overflow-y-scroll pb-4">
      {
        channelList?.map((item: any) => (
          <ChannelItem key={item.id} link={`/channel/${item.id}`} docId={item.id} name={item.data.name} />
        ))
      }
    </div>
  )
}

export default ChannelList;
