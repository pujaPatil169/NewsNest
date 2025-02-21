import React from 'react';
import ChatItem from '../shared/ChatItem';
import { Stack } from '@mui/material';

// const ChatList = () => {
//   const chatData = [
//     { username: 'User1', message: 'Hello!', timestamp: '10:00 AM' },
//     { username: 'User2', message: 'Hi there!', timestamp: '10:01 AM' },
//     { username: 'User3', message: 'How are you?', timestamp: '10:02 AM' },
//   ];

//   return (
//     <div>
//       {chatData.map((chat, index) => (
//         <ChatItem 
//           key={index} 
//           username={chat.username} 
//           message={chat.message} 
//           timestamp={chat.timestamp} 
//         />
//       ))}
//     </div>
//   );
// };


const ChatList =({chats=[],chatId,w="100%",onlineUsers=[],newMessagesAlert=[
    {
        chatId:"",
        count:0
    },handleDeleteChat
]})=>{
  return (
    <Stack w={w} direction="column" >
      {chats?.map((chat,index)=>(
        <ChatItem 
          key={index} 
          username={chat.username} 
          message={chat.message} 
          timestamp={chat.timestamp} 
        />
      ))}
    </Stack>
  );
}
export default ChatList;
