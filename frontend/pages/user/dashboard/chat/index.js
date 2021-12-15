import { useState, useEffect, memo, useRef } from 'react';
import Sidebar from '@/chat/Sidebar';
import Chat from '@/chat/Chat';
import styles from '@/styles/chat.module.scss'
import EcommerceLoader from '@/components/Loader/EcommerceLoader'
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch} from 'react-redux'
import Image from 'next/image' 
import { api } from "@/utils/api";
import scalePage from "@/chat/scalePage";
import { API } from '@/config/config';
import withAuth from '@/components/auth'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'
import { io } from "socket.io-client";
import Layout from '@/containers/Layout'


const App = ({match}) => {
    
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { page, pathID  }  = useSelector(state => state.chat);
  const { user }  = useSelector(state => state.auth);
  const [pwaEvent, setPwaEvent] = useState(undefined);
  const [chats, setChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef()
  

  const dispatch = useDispatch();
  
//   useEffect(() => {
//     socket.current = io("http://localhost:5000");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.get(`${API}/conversation/` + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get(`${API}/message/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


    useEffect(() => { 
        const getConversation = async () => {
            try {
            const res = await api.get(`${API}/conversation/${user._id}`)
            setConversation(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getConversation();        
    }, [user])
        
  return (
   <Layout>
       { isTabletOrMobile ?
        
        ( <div className={`${styles.app}bg-white min-h-screen bg-white`}>
            <Sidebar chats={chats} user= {user.name} isTabletOrMobile={isTabletOrMobile} />
         </div>

        ) : (
        <div className={`${styles.app} mt-3 mx-auto rounded-sm shadow-button bg-white`} style={ !isTabletOrMobile && {minHeight:'80vh'}}>
            { user ?
                ( <div className={styles.app__body}>
                    <Sidebar chats={chats} user= {user.name} isTabletOrMobile={isTabletOrMobile} />
                    <div className="bg-white w-full relative">
                        <div className="Center">
                            <div>
                                <img
                                    src="https://res.cloudinary.com/lenx2222/image/upload/v1636925123/ezgif.com-gif-maker_1_ersysi.jpg"
                                    alt="Picture of the author"
                                    className="w-2/3 mx-auto"
                                />
                                <h2 className="text-center text-lg font-bold mt-4">
                                    Hire professionals with peace of mind.
                                </h2>
                            </div>
                        </div>
                    </div>
                </div> 
                ) : (
                <div className={styles.loader__container}>
                    <EcommerceLoader />
                </div>
            )}
        </div>
    )}
    </Layout>
  );
}

export default withAuth(App);

