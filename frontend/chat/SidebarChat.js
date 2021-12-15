import {useEffect,  memo, useRef, useState} from 'react';
import { MdCancel, MdSearch, MdPhoto, MdMic } from 'react-icons/md';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { api } from "@/utils/api";
import { API } from '@/config/config'


//window
const SidebarChat = ({ dataList, title, fetchList}) => {
    const router = useRouter();
    const {page, pathID, conversations} = useSelector( state => state.chat);
    const { user } = useSelector( state => state.auth);
    const [scrollFetch, setScrollFetch] = useState(false);
    const [messages, setMessages] = useState([]);
    const sidebarChatContainer = useRef();
    const MAX_LENGTH = 30
    const dispatch = useDispatch();
    
    var path = '/user/dashboard/chat'

    const handleClick = (data) => {
        dispatch({
                   type: "CURRENT_CHAT",
                   payload: data,
            });
        router.push(`/user/dashboard/chat/${data._id}`)
    }

    useEffect(() => {
        var a = null;  
        if (fetchList) {
            a = function () {
                if (parseInt(sidebarChatContainer.current.scrollTop) === sidebarChatContainer.current.scrollHeight - sidebarChatContainer.current.offsetHeight) {
                    fetchList(setScrollFetch);
                };
            };
            if (dataList?.length > 0) {
                sidebarChatContainer.current.addEventListener("scroll", a);
            };
        };
        const clean = sidebarChatContainer.current;
        return () => {
            if (a) {
                //console.log("removing event");
                clean.removeEventListener("scroll", a);
                
            };
        };
    }, [dataList, fetchList]);
    

     useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.get(`${API}/conversation/` + user._id);
        dispatch({
                    type: "CONVERSATION",
                    payload: res.data,
                    })
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);


  const List = () => {
      return (
        <>
            { !conversations.length ? (
                <div className="mt-6 mx-auto">
                    <div className="m-auto text-center">
                        <span className="font-bold capitalize text"> Sorry there are no chats available </span>
                    </div>
                </div>
                ) : (
                conversations.map((data, i) => (
                    <div className="link" 
                        key={i}
                        onClick={() => handleClick(data)}>
                        <div 
                            className={`sidebar__chat  px-4 py-3 shadow-separator hover:bg-Grey-dashboard cursor-pointer text flex ${window.location.href.includes(`/user/dashboard/chat/${data._id}`) && "bg-Grey-dashboard"}`}
                        >
                            <div className="avatar__container">
                                <section className="h-10 w-10 bg-cover bg-center rounded-full shadow-button cursor-pointer" style={{background: `url("${user._id === data.members[0]._id ? data.members[1].avatar : data.members[0].avatar }")`}}/>
                            </div>
                            <div className="flex justify-between ml-3 w-full">
                                <div className="w-full">  
                                    <div className="font-bold text-Black capitalize"> {user._id === data.members[0]._id ? data.members[1].name : data.members[0].name } </div>
                                    <div className="flex text-Black-medium justify-between w-full">
                                        <div>
                                            {data.lastMessage.substring(0, MAX_LENGTH)} {data.lastMessage.length > MAX_LENGTH ? "..." : ""} 
                                        </div> 
                                        <div className="my-auto ml-3"> {moment(data.updatedAt).startOf('day').fromNow()} </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    )}



    useEffect(() => {
        if (page.width <= 760) {
            dispatch({type: "SET_PATH", path: path});
        } else {
            dispatch({type: "SET_PATH", path: ""})
        }
    }, [path, page]);

    return (
        <div ref={sidebarChatContainer} className="sidebar__chat--container">
            <List />
        </div>
    )
}

export default memo(SidebarChat);
   
    