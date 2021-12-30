import React, { useState, useRef, useEffect, memo } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import { AiFillWechat, AiFillSecurityScan } from "react-icons/ai";
import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux"
import { sendNewMessage, getConversations } from "@/redux/actions/chatAction"


const Chat = ({receiver}) => {
  const socket = useRef();
  const [ text, setText] = useState("")
  const { user, isAuthenticated } = useSelector( state => state.auth)
  const [ error, setError ] = useState(false)
  const dispatch = useDispatch()

  console.log({receiver})

//   useEffect(() => {
//     socket.current = io("http://localhost:5000");
//   }, []);

    const handleSubmit = (e) => {
     e.preventDefault();
     const message = {
       text: text,
       receiverId: receiver.id
     };
     console.log({message})
     if(isAuthenticated){
    //  socket.current.emit("sendMessage", {
    //    senderId: user._id,
    //    receiverId: receiver._id,
    //    text: text,
    //  });
     dispatch(sendNewMessage(message))
    } else {
        setError(true)
    }
     setText("")
     setTimeout(() => dispatch(getConversations(user)), 300)
  };

    return (
        <>
            { receiver && 
                <form className="h-full"
                    onSubmit={handleSubmit}
                >
                    <div className="mt-3 h-full">
                        <div className="p-3">
                            <div className="p-2 rounded-lg bg-orange-light flex mt-1 mb-4 mr-3">
                                <AiFillSecurityScan className="my-auto text-xl text-white h-10 w-10" />
                                <h1 className="text-sm text-white ml-2">To protect your orders，always communicate and pay through the LENX website. </h1>
                            </div>
                            <div className="my-3"
                            >
                                <Avatar src={receiver.avatar}/>
                                 <span className="text font-bold text-Black-text capitalize ml-1">
                                    {receiver.name}
                                </span>
                            </div>
                            <div className="mb-4">
                                { !isAuthenticated && error &&
                                    ( 
                                        <div className="my-3">
                                            <Link href="/signin" className="underline text ">Please sign in before sending any message</Link>
                                        </div>
                                    )
                                }
                                <input className="border-box py-2 h-28 text-Black-text w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2" 
                                    placeholder="Type your message here"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                        </div>
                    </div> 
                    <div className="sticky bottom-0 border-t-2 border-Grey-border p-2 bg-white w-full">
                        <div className="grid grid-cols-2">
                            <div className="ml-auto my-auto">
                            <Button 
                                className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
                                >
                                <a href={`tel:${receiver.mobile}`}>
                                { receiver.mobile }
                                </a>
                            </Button>
                            </div>
                            <div className="mr-auto">
                                <Button
                                onClick={() => setIsOpen(true)} 
                                className="bg-Blue text-white flex border-2 border-Blue"
                                >
                                <AiFillWechat className="my-auto text-lg mr-2"/>
                                Chat now
                                </Button>
                            </div>
                        </div>
                    </div>  
                </form>
            }
        </>
    )
}

export default memo(Chat)
