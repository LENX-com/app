import React from 'react'
import Conversations from '../components/chat/Conversations' 
import ConversationManufacturer from '../components/chat/ConversationManufacturer' 

function Chat() {
    return (
      <>
       <ConversationManufacturer />
       <Conversations />
      </>
   )
}

export default Chat
    