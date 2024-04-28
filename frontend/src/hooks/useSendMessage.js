import React, { useState } from 'react'
// import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { useConvoContext } from '../zustand/useConversation';

const useSendMessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation} = useConvoContext();
  const sendMessage = async(message)=>{
    setLoading(true);
    try{
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{
           method:"POST",
           headers:{"Content-Type" :"application/json"},
           body:JSON.stringify({message}) 

    })
    const data = await res.json();
    if(!data) throw new Error(data.error);

    setMessages([...messages,data]);
    }catch(error){
        toast.error(error.message +" here")
    }finally{
        setLoading(false)
    }
  }
  return {sendMessage,loading};
}

export default useSendMessage
