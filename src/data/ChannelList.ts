interface MemberProps {
  id: number,
  name: string
}

interface ChannelProps {
  id: number;
  name: string;
  members: MemberProps[];
}

const channelList: ChannelProps[] = [
  {
    id: 1, name: "Channel 1", members:
      [
        { id: 1, name: "User 1" }, { id: 2, name: "User 2" }, { id: 3, name: "User 3" }, { id: 4, name: "User 4" }, { id: 5, name: "User 5" },
      ]
  },
  { id: 2, name: "Channel 2", members: [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }, { id: 3, name: "User 3" }, { id: 4, name: "User 4" }, { id: 5, name: "User 5" },] },
  { id: 3, name: "Channel 3", members: [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }, { id: 3, name: "User 3" }, { id: 4, name: "User 4" }, { id: 5, name: "User 5" },] },
  { id: 4, name: "Channel 4", members: [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }, { id: 3, name: "User 3" }, { id: 4, name: "User 4" }, { id: 5, name: "User 5" },] },
  { id: 5, name: "Channel 5", members: [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }, { id: 3, name: "User 3" }, { id: 4, name: "User 4" }, { id: 5, name: "User 5" },] },
];

export { channelList, ChannelProps };
