import axios from "axios";
import { useEffect, useState } from "react";
import { API } from '../../config'

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${API}/users?userId=` + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src= "https://avatars.githubusercontent.com/u/80533622?s=60&v=4"
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}