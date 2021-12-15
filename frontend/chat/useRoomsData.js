// import {useEffect, useRef} from "react";
// import { useStateValue } from "./StateProvider";

// import { useDispatch, useSelector } from 'react-redux'

// export default function useRoomsData() {
//     const [{ roomsData: initRoomsData }] = useSelector(state => state);
//     const roomsData = useRef(initRoomsData)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         roomsData.current = initRoomsData;
//     }, [initRoomsData])
    
//     return [function setRoomsData(userID, roomID) {
//         if (!roomsData.current[roomID]) {
//             const lastMessageListener = db.collection("rooms").doc(roomID).onSnapshot(doc => {
//                 //console.log("last message listener executed with room id: ", roomID)
//                 dispatch({
//                     type: "update_rooms_data",
//                     dataType: "lastMessage",
//                     data: doc.data()?.lastMessage,
//                     roomID
//                 });
//             });
//             const onlineStateListener = db.collection("users").doc(userID).onSnapshot(doc => {
//                 //console.log("onlineState listener executed with room id: ", roomID)
//                 dispatch({
//                     type: "update_rooms_data",
//                     dataType: "onlineState",
//                     data: doc.data()?.state,
//                     roomID
//                 });
//             });
//             dispatch({
//                 type: "add_rooms_data",
//                 roomID,
//                 lastMessageListener: lastMessageListener,
//                 onlineStatelistener: onlineStateListener 
//             });
//         };
//     }];
// };