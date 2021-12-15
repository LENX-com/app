import { useState, useEffect, memo, useRef } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Route, useLocation, useRouteMatch  } from 'react-router-dom';
import EcommerceLoader from '../components/Loader/EcommerceLoader'
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch} from 'react-redux' 
import { api } from "../utils/api";
import scalePage from "./scalePage";
import { API } from '../config';
import axios from 'axios';
import { io } from "socket.io-client";




const App = ({match}) => {

  const { path } = useRouteMatch();
  const { page, pathID  }  = useSelector(state => state.chat);
  const { user }  = useSelector(state => state.auth);
  const [pwaEvent, setPwaEvent] = useState(undefined);
  const [chats, setChats] = useState(null);
  const [chatsFetched, setChatsFetched] = useState();
  const location = useLocation();
  const b = useRef([]);
  const menus = ["/rooms", "/search", "/users", "/chats"];
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef()
  

  const dispatch = useDispatch();


   useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      //console.log("pwa event executed");
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPwaEvent(e);
      // Update UI notify the user they can install the PWA
    });
    window.addEventListener("resize", () => {
      dispatch({ type: "set_scale_page", page: scalePage() });
    })
  }, []);
  ;

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

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
            console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        getConversation();        
    }, [user])
        
  return (
   <div className="app mt-3" style={{ ...page }} >
       {/* {page.width <= 760 ?  
        <Redirect to="/chats" />
        : <Redirect to="/" />} */}
      { user ?
          <div className="app__body">
            <Sidebar chats={chats} user= {user.name}
            // rooms={rooms} fetchRooms={fetchRooms} users={users} fetchUsers={fetchUsers}
             />
            <TransitionGroup component={null} >
              {page.width <= 760 ?
                <Transition
                  key={location.pathname.replace("/image", "")}
                  timeout={260}
                >
                  {state => (
                    <Route location={location} path={`${path}/room/:roomID`}>
                      <Chat
                        b={b}
                        unreadMessages={chats?.length > 0 ? chats.find(cur => cur.id === pathID)?.unreadMessages : 0}
                        animState={state}
                      />
                    </Route>
                  )}  
                </Transition>
                :
                <CSSTransition
                  key={location.pathname.replace("/image", "")}
                  timeout={1010}
                  classNames="page"
                >
                  {state => (
                    <Route location={location} path={`${match.path}/room/:roomID`}>
                      <Chat
                        b={b}
                        unreadMessages={chats?.length > 0 ? chats.find(cur => cur.id === pathID)?.unreadMessages : 0}
                        animState={state}
                      />
                    </Route>
                  )}
                </CSSTransition>
              }
            </TransitionGroup>
          </div> :
          <div className="loader__container">
            <EcommerceLoader />
          </div>
      }
    </div>
  );
}

export default memo(App);

