interface User {
  email: string,
  password: string
}
interface Channels{
  channelId: string,
  role: string,
  channel_image_url: string,
  channel_name: string,
}
interface ChannelDeatils{
  channelId: string,
  name: string,
  description: string,
  image_url: string,
  users: Users[]
}
interface Users{
  userId: string,
  user_email:string,
  role: string
}
interface UserDetails{
    userId: string,
    email: string,
    password: string,
    image_url: string,
    bio: string,
    channels: Channels[]
}


interface Chats{
  msg: string,
  sendBy:string,
  SendByUserEmail: string,
  sendTo: string,
}
export {
  User,
  Channels,
  ChannelDeatils,
  Users, UserDetails,
  Chats
}
