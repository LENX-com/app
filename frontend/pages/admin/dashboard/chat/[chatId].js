import { useState, useEffect, useLayoutEffect, useRef, memo } from 'react';
import Avatar from '@/components/Avatar/Avatar'
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
import styles from '@/styles/chat.module.scss'
 import { MdAddAPhoto, MdMoreVert, MdDone, MdArrowDownward, MdArrowBack } from 'react-icons/md';
import { useRoter } from 'next/router'
import EcommerceLoader from '@/components/Loader/EcommerceLoader'
import { useMediaQuery } from 'react-responsive'
import Header from '@/marketplace/components/header/Header'
import { useRouter } from 'next/router'
import Layout from '@/containers/Layout'
import withAuth from '@/components/auth'
import ChatFooter from "@/chat/ChatFooter";
import Sidebar from '@/chat/Sidebar';
 import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API } from '@/config/config';
import { api } from '@/utils/api'
import { io } from "socket.io-client";
import ManufacturerProfile from '@/chat/ManufacturerProfile'


function Chat({ animState, unreadMessages, b }) {
    const router = useRouter();
    const [input, setInput] = useState('');  
    const [ ok ,setOk ] = useState(false)
    const dispatch = useDispatch();
    const socket = useRef();

    // const [{ dispatchMessages, user, roomsData, page }, dispatch, actionTypes] = useStateValue();
    const { dispatchMessages, page, currentChat }  = useSelector( state => state.chat);
    const { user } = useSelector( state => state.auth)
    const [chats, setChats] = useState(null);
    const [imagePreview, setImagePreview] = useState({})
    const [messages, setMessages] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [focus, setFocus] = useState(false);
    const [token, setToken] = useState('');
    const [seen, setSeen] = useState(false);``
    const [src, setSRC] = useState('');
    const [image, setImage] = useState(null);
    const [scrollArrow, setScrollArrow] = useState(false);
    const [clientWidth, setClientWidth] = useState(null);
    const [sendAnim, setSendAnim] = useState(false);
    const chatBodyRef = useRef();
    const lastMessageRef = useRef();
    const chatBodyContainer = useRef();
    const chatAnim = useRef();
    const prevMessages = useRef([])
    const limit = useRef(30);
    const prevScrollHeight = useRef(null);
    const [audioID, setAudioID] = useState(null);
    const [paginateLoader, setPaginateLoader] = useState(false);
    const [ arrivalMessage, setArrivalMessage] = useState()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const clickImagePreview = (event, src, ratio) => {
        const target = event.target;
        const node = target.parentNode.parentNode;
        const obj = node.getBoundingClientRect();
        setImagePreview({
    		ratio: ratio,
            top: page.transform === "scale(1)" ? obj.top :  obj.top / (window.innerHeight / page.height),
            left: page.transform === "scale(1)" ? obj.left : obj.left / (window.innerWidth / page.width),
            width: node.offsetWidth,
            height: node.offsetHeight,
            imgW: target.offsetWidth,
            imgH: target.offsetHeight,
            src,
        })
    }  

    const handleFile = event => {
        if (window.navigator.onLine) {
            if (event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function () {
                    setSRC(reader.result)
                }
                reader.readAsDataURL(event.target.files[0]);
                setImage(event.target.files[0])
            };
        } else {
            alert("No access to internet !!!");
        };
    };

            
    //     useEffect(() => {
    //      socket.current = io("http://localhost:5000");
    //     socket.current.on("getMessage", (data) => {
    //     setArrivalMessage({
    //         sender: data.senderId,
    //         text: data.text,
    //         createdAt: Date.now(),  
    //     });
    //     });
    // }, []);

        useEffect(() => {
            arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
        }, [arrivalMessage, currentChat]);

    //window
    // useEffect(() => {
    //     setClientWidth(document.querySelector('.chat__body__container').clientWidth)
    // }, []);

    function outerHeight(el) {
      if (el) {
        var height = el.offsetHeight;
          var style = getComputedStyle(el);

          height += parseInt(style.marginTop) + parseInt(style.marginBottom);
          return height;
      }
      return null;
    }

    const widthRatio = 0.7;

    useEffect(() => {  

    const getMessages = async () => {
      try {
        const res = await axios.get(`${API}/message/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

    const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      text: input,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    // socket.current.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: input,
    // });
    setOk(true)
    try {
      const res = await api.post(`${API}/message`, message);
      setMessages([...messages, res.data]);
      setInput("");
      const conv = await api.get(`${API}/conversation/` + user._id);
      dispatch({
                  type: "CONVERSATION",
                  payload: conv.data,
                })
      conv()
            } catch (err) {
                console.log(err);
            }
  };
    return (
        <>  
            {
               !isTabletOrMobile && <Header />
            }
            <div className={`${styles.app} lg:mt-8 mx-auto rounded-sm shadow-button bg-white `}>
                <div className={styles.app__body}>
                    { !isTabletOrMobile &&
                        <Sidebar user= {user.name} isTabletOrMobile={isTabletOrMobile} />
                    }
                    <div className="relative w-full bg-white mobile:h-screen">
                        <div ref={chatAnim} className={`${styles.chat} w-full bg-white`} style={{maxHeight:'85vh'}}>
                            <div className="rounded-md mobile:sticky top-0 bg-white z-50">
                                <div className= {`${styles.chat__header} shadow-separator mobile:py-10 mobile:px-4`}>
                                {isTabletOrMobile ?
                                    <div className="flex">
                                        <button className="text-2xl" onClick={() => setTimeout(() => router.back(), 150)}>
                                            <MdArrowBack className="text-Blue " />
                                        </button>
                                        <div className={styles.avatar__container}>
                                            <Avatar src={user._id === currentChat.members[0]._id ? currentChat.members[1].avatar : currentChat.members[0].avatar} />
                                        </div>
                                    </div>
                                : 
                                    <div className={styles.avatar__container}>
                                        <Avatar src={user._id === currentChat?.members[0]._id ? currentChat?.members[1].avatar : currentChat?.members[0].avatar} />
                                    </div>
                                } 
                                <div className={styles.chat__header__info}>
                                    <h3 className="capitalize"> {user._id === currentChat.members[0]._id ? currentChat.members[1].name : currentChat.members[0].name} </h3>
                                </div>
                                <div className="">
                                    <ManufacturerProfile user={user._id === currentChat.members[0]._id ? currentChat.members[1] : currentChat.members[0]}/>
                                </div>
                            </div>
                        </div>
                        <div className= {`${styles.chat__body__container} overflow-scroll mobile:min-h-screen mobile:bg-white`} ref={chatBodyContainer}>
                            <div className={`${styles.chat__body} lg:mb-22 mobile:py-10 bg-white`} ref={chatBodyRef}>
                                <div 
                                    className={styles.loader__container}
                                >
                                </div>
                                {messages.map((message, i, messageArr) => {
                                    const style = message.imageUrl ? {
                                        marginBottom: !messageArr[i + 1] ? 0 : message._id !== messageArr[i + 1]._id ? 30 : 8,
                                        width: clientWidth * widthRatio + 20,
                                        maxWidth: 320,
                                    } : {
                                            marginBottom: !messageArr[i + 1] ? 0 : message._id !== messageArr[i + 1]._id ? 30 : 8,
                                            width: clientWidth * widthRatio + 20, 
                                            maxWidth: 320,
                                        }
                                    return (
                                        <div style={style} ref={i === messages.length - 1  ? lastMessageRef : null} key={message._id} className={`${styles.chat__message} ${message.sender === user._id ? styles.chat__reciever : "bg-Grey"} ${i === messages.length - 1 ? "chat__lastMessage" : ""} w-auto`}>
                                            <span className={styles.chat__name}>
                                                { message.sender === currentChat.members[0]._id ? currentChat.members[0].name : currentChat.members[1].name }
                                            </span>
                                            <span className={`${styles.chat__message__message} w-auto`}>{message.text}</span>
                                        </div>
                                    )
                                })}
                                {messages.length > 0 ?
                                    <CSSTransition
                                        in={seen && messages[messages.length - 1].uid === user.uid}
                                        timeout={200}
                                        classNames="seen-animate"
                                        appear={true}
                                    >
                                        <p className={styles.seen} >
                                            <p><span>Seen <MdDone /></span></p>
                                        </p>
                                    </CSSTransition>
                                : null}
                            </div>
                        </div>
                        <ChatFooter 
                            input={input} 
                            setFocus={setFocus}
                            image={image}
                            change={(e) => setInput(e.target.value)}
                            focus={focus}
                            token={token}
                            setAudioID={setAudioID}
                            sendMessage={sendMessage} 
                        />
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(withAuth(Chat));


