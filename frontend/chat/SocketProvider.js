import React, { useEffect, useState, useContext, createContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}
export default function SocketProvider({ children }) {
  const id = useSelector((state) => state.auth.user._id);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
