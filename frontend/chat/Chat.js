import { useState, useEffect, useLayoutEffect, useRef, memo } from 'react';
import Avatar from '../components/Avatar/Avatar'
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
import { MdAddAPhoto, MdMoreVert, MdDone, MdArrowDownward, MdArrowBack } from 'react-icons/md';
import { useRoter } from 'next/router'
import EcommerceLoader from '../components/Loader/EcommerceLoader'
import { useRouter } from 'next/router'
import ChatFooter from "./ChatFooter";
import anime from 'animejs';
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
    const [imagePreview, setImagePreview] = useState({})
    const [messages, setMessages] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [chats, setChats] = useState(null);
    const [focus, setFocus] = useState(false);
    const [token, setToken] = useState('');
    const [seen, setSeen] = useState(false);``
    const [typing, setTyping] = useState(false);
    const [src, setSRC] = useState('');
    const [image, setImage] = useState(null);
    const [writeState, setWriteState] = useState(0);
    const [ratio, setRatio] = useState(false);
    const [scrollArrow, setScrollArrow] = useState(false);
    const [clientWidth, setClientWidth] = useState(null);
    const [firstRender, setFirstRender] = useState(false);
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
    const scrollChatBody = () => {
        const nodeArr = Array.from(document.querySelectorAll('.chat__message'));
        const height =  outerHeight(nodeArr[nodeArr.length - 2]) + outerHeight(nodeArr[nodeArr.length - 3]) + outerHeight(nodeArr[nodeArr.length - 4]);
        const lastMHeight = height < page.height / 2 ? height : page.height / 2;
        if (chatBodyContainer.current.scrollHeight - chatBodyContainer.current.offsetHeight === 0) {
            setTimeout(() => {
                if (chatBodyRef.current) {
                	chatBodyRef.current.style.opacity = "1";
                }
                setFirstRender(true)
            }, animState === "entering" ? 350 : 50);
            setTimeout(() => {
                const node = document.querySelector(".chat .chat__lastMessage");
                if (node) {
                    node.style.animation = "none";
                    node.style.opacity = "1";
                }
            }, 50)
        } else if (chatBodyContainer.current.scrollTop + outerHeight(nodeArr[nodeArr.length - 1]) >=
            (chatBodyContainer.current.scrollHeight - chatBodyContainer.current.offsetHeight - lastMHeight)
            && messages[messages.length - 1].uid !== user.uid) {
            if (chatBodyContainer.current.scrollTop !== chatBodyContainer.current.scrollHeight) {
                //console.log("scrolling down 1");
                setSendAnim(true);
                anime({
                    targets: chatBodyContainer.current,
                    scrollTop: chatBodyContainer.current.scrollHeight,
                    duration: 800,
                    easing: "linear",
                    complete: function() {
                        setSendAnim(false);
                    }
                });   
            };
        } else if (messages[messages.length - 1].uid === user.uid) {
            if (chatBodyContainer.current.scrollTop !== chatBodyContainer.current.scrollHeight) {
                //console.log("scrolling down 2");
                setSendAnim(true);
                anime({
                    targets: chatBodyContainer.current,
                    scrollTop: chatBodyContainer.current.scrollHeight,
                    duration: 800,
                    easing: "linear",
                    complete: function() {
                        setSendAnim(false);
                    }
                });   
            }

        } else {
            setScrollArrow(true);
        }  
    }

    useEffect(() => {
        setClientWidth(document.querySelector('.chat__body--container').clientWidth)
    }, []);

        useEffect(() => {
        if (animState === "entering" && page.width <= 760) {
            setTimeout(() => {
                document.querySelector(".chat").classList?.add('chat-animate');
            }, 0)
        } 
    }, [animState])

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

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: input,
    });
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
        <div ref={chatAnim} className="chat lg:px-4">
            <div style={{
                height: page.height,
            }} className="chat__background">

            </div>

            <div className="rounded-md">
                <div className={styles.chat__header}>
                    {page.width <= 760 ?
                    <div className="flex">
                            <button className="text-2xl" onClick={() => setTimeout(() => router.back(), 150)}>
                                <MdArrowBack className="text-Blue " />
                            </button>
                            <div className="avatar__container">
                                <Avatar src={user._id === currentChat.members[0]._id ? currentChat.members[1].avatar : currentChat.members[0].avatar} />
                            </div>
                    </div>
                    : 
                        <div className="avatar__container">
                             <Avatar src={user._id === currentChat?.members[0]._id ? currentChat?.members[1].avatar : currentChat?.members[0].avatar} />
                        </div>
                    }
                    <div className="chat__header--info">
                        <h3 className="capitalize"  style={page.width <= 760 ? {width: page.width - 165 } : {}}> {user._id === currentChat.members[0]._id ? currentChat.members[1].name : currentChat.members[0].name} </h3>
                        {/* <p style={page.width <= 760 ? {width: page.width - 165 } : {}}>{typing === "recording" ? "Recording ..." : typing ? "Typing ..." : messages?.length > 0 ? "Seen at " + messages[messages.length - 1]?.timestamp : ""} </p> */}
                    </div>
                    <div className="flex">
                        <div className="cursor-pointer">
                            <input id="attach-media" style={{ display: "none" }} accept="image/*" type="file" onChange={handleFile} />
                            <button>
                                <label style={{ cursor: "pointer", height: 24 }} htmlFor="attach-media">
                                    <MdAddAPhoto className="cursor-pointer hover:text-Blue"/>
                                </label>
                            </button>
                        </div>
                        <ManufacturerProfile user={user._id === currentChat.members[0]._id ? currentChat.members[1] : currentChat.members[0]}/>
                    </div>
    
                </div>
            </div>

            <div className="chat__body--container" ref={chatBodyContainer}>
                <div className="chat__body" ref={chatBodyRef}>
                    <div 
                        className="loader__container paginateLoader"
                    >
                        {/* {paginateLoader && !limitReached ? <EcommerceLoader /> : null} */}
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
                            <div style={style} ref={i === messages.length - 1  ? lastMessageRef : null} key={message._id} className={`chat__message ${message.sender === user._id ? "chat__reciever" : ""} ${i === messages.length - 1 ? "chat__lastMessage" : ""}`}>
                                <span className="chat__name">
                                      { message.sender === currentChat.members[0]._id ? currentChat.members[0].name : currentChat.members[1].name }
                                </span>
                                {message.imageUrl === "uploading" ?
                                    <div
                                        style={{
                                            width: clientWidth * widthRatio,
                                            height: message.ratio <= 1 ?
                                                    clientWidth * widthRatio > 300 ?
                                                        300 * message.ratio : clientWidth * widthRatio * message.ratio :
                                                    clientWidth * widthRatio < 300 ? clientWidth * widthRatio : 300,
                                        }}
                                        className="image-container"
                                        
                                    >
                                        <div className="image__container--loader">
                                            <EcommerceLoader style={{ width: page.width <= 760 ? 40 : 80, height: page.width <= 760 ? 40 : 80 }} />
                                        </div>
                                    </div>
                                    : message.imageUrl ?
                                        <div                                       	
                                            className="image-container"
                                            style={{
                                                width: clientWidth * widthRatio,
                                                height: message.ratio <= 1 ?
                                                        clientWidth * widthRatio > 300 ?
                                                            300 * message.ratio : clientWidth * widthRatio * message.ratio :
                                                        clientWidth * widthRatio < 300 ? clientWidth * widthRatio : 300,
                                            }}
                                        >
                                            <a>
                                                <img onClick={(e) => clickImagePreview(e, message.imageUrl, message.ratio)} src={message.imageUrl} alt="" />
                                            </a>
                                        </div>
                                        : null}
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
                            <p className="seen" >
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
                state={state}
                token={token}
                setAudioID={setAudioID}
                sendMessage={sendMessage} 
            />
            <div></div>
            				
            <CSSTransition
                in={firstRender && scrollArrow && !sendAnim}
                classNames="scroll"
                timeout={310}
                unmountOnExit
            >
                <div className="scroll" onClick={() => 
                    anime({
                        targets: chatBodyContainer.current,
                        scrollTop: chatBodyContainer.current.scrollHeight,
                        duration: 1000,
                        easing: "linear",
                    })}
                >
                    <MdArrowDownward style={{
                        width: 22,
                        height: 22,
                        color: "black",
                    }} />
                    {unreadMessages ? <div><span>{unreadMessages}</span></div> : null}
                </div>
            </CSSTransition>
            {deleting ?
                <div className="chat__deleting">
                    <EcommerceLoader />
                </div> : null
            }
        </div>
        <TransitionGroup component={null}>
            <Transition
                timeout={{
                    appear: 310,
                    enter: 310,
                    exit: 410,
                }}
                classNames="page"
                key={'i'}
            >
            </Transition>
        </TransitionGroup>
        </>
    )
}

export default memo(Chat);


