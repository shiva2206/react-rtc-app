import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import { useConvoContext } from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
export const useListenMessages = ()=>{
    const {socket} = useSocketContext();

    const {messages,setMessages} = useConvoContext();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage) =>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages,newMessage])

        })

        return ()=> socket?.off("newMessage");
    },[socket,setMessages,messages]);
}