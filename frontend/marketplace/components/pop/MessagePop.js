import React from 'react'
import PopUp from './PopUp'

const MessagePop = ({messageOpen, setMessageOpen}) => {
    return (
        <PopUp isOpen={messageOpen} setIsOpen={setMessageOpen}>
            Hey dude 
        </PopUp>
    )
}

export default MessagePop
