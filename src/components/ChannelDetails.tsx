import React from 'react'
import ChannelMembersList from './ChannelMembersList'

const ChannelDetails: React.FC<ChannelDetailsProps> = ({ channelName, description }) => {
  return (
    <article className="text-white mt-6 px-8">
      <h2 className="font-bold text-lg">{channelName}</h2>
      <p className="text-lg font-normal mt-6 h-28 overflow-y-scroll">
        {description}
      </p>
      <ChannelMembersList />
    </article>
  )
}

export default ChannelDetails