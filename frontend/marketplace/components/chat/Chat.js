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
                    <div className="pt-3 h-full">
                        <div className="p-3">
                            <div className="p-2 rounded-lg bg-lightBlack flex mt-1 mb-4 mr-3">
                                <AiFillSecurityScan className="my-auto text-xl text-Grey h-10 w-10" />
                                <h1 className="text-sm text-white ml-2">To protect your orders, always communicate through the Wabei website. </h1>
                            </div>
                            <div className="my-3 flex"
                            >
                                <Avatar src={receiver.avatar} className="bg-white border border-white"/>
                                 <span className="text font-bold text-Black-text capitalize ml-3 my-auto">
                                    {receiver.name}
                                </span>
                            </div>
                            <div className="mb-4">
                                { !isAuthenticated && error &&
                                    ( 
                                        <div className="my-3 underline">
                                            <Link href="/signin" className="underline text ">Please sign in before sending any message</Link>
                                        </div>
                                    )
                                }
                                <div className="mt-5">
                                    <input className="border-box py-2 h-28 text-Black-text w-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent p-2 capitalize" 
                                        placeholder="Type your message here"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="sticky bottom-0 p-2 bg-white w-full">
                        <div className="grid grid-cols-2">
                            { receiver.mobile &&
                                <div className="ml-auto my-auto">
                                    <Button 
                                        className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
                                        >
                                        <a href={`tel: 0${receiver.mobile}`}>
                                        {`0${receiver.mobile}`}
                                        </a>
                                    </Button>
                                </div>
                            }
                            <div className="mr-auto">
                                <Button
                                onClick={(e) => handleSubmit(e)}
                                className="bg-Blue text-white flex border-2 border-Blue"
                                >
                                <AiFillWechat className="my-auto text-lg mr-2"/>
                                    Send message
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
