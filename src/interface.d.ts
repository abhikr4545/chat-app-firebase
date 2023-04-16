interface MemberProps {
  name: string,
}

interface ChannelDetailsProps {
  channelName: string | undefined,
  description: string | undefined
}

interface ChannelMemberProps {
  members: MemberProps[] | undefined
}

interface ChildrenProps {
  children: React.ReactNode
}

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

interface Message {
  message: string,
}