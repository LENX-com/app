import { useEffect, useState, memo } from 'react';
import { MdMessage, MdPeople, MdHome, MdExitToApp as LogOut, MdSearch, MdPhoto } from 'react-icons/md';
import { NavLink } from '@/components/NavLink/NavLink'
import { useRouter } from 'next/router';
 import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux'
import SidebarChat from '@/chat/SidebarChat';
import styles from '@/styles/chat.module.scss'


const Sidebar = ({ chats, isTabletOrMobile }) => {
    const [searchInput, setSearchInput] = useState("");
    const [mounted, setMounted] = useState(false);
    const { page, pathID } = useSelector( state => state.chat);
    const router = useRouter();

    useEffect(() => {
        if (page.width <= 760) {
            setMounted(true);
            setTimeout(() => {  
                document.querySelector('.sidebar-chat').classList.add('side');
            }, 10);
        };
    }, [chats, mounted]);

    var url = '/user/dashboard/'


    return (

        <div className="sidebar-chat lg:border-r-2">
            <div className={` ${styles.sidebar__search} shadow-separator`}>
                <div>
                    <button className="text-2xl" onClick={() => setTimeout(() => router.back(), 150)}>
                        <MdArrowBack className="text-Blue " />
                    </button>
                </div>
                <form className={`${styles.sidebar__search} bg-white h-8 px-3 pr-12 rounded-lg text-sm focus:outline-none my-3 border-box mobile:mx-auto mobile:mt-3 mobile:mb-1`}>
                    <MdSearch className="ml-3 text-lg text-Black-text cursor-pointer"/>
                    <input  
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search for chats"
                        className="bg-transparent text-sm"
                        type="text"
                    />
                    <button style={{ display: "none" }} type="submit" onClick={"search"}></button>
                </form>
            </div>
             <SidebarChat dataList={chats} title="Chats" />
        </div>
    );
};

export default memo(Sidebar);


          