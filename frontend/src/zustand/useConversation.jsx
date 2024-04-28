// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;

import React, { useState,createContext } from 'react'
import { useContext } from 'react'

const convoContext = createContext()

export const useConvoContext = ()=>{
	return useContext(convoContext);
}
const ConvoContextProvider = ({children})=>{
	const [messages,setMessages] = useState([]);
	const [selectedConversation,setSelectedConversation] = useState(null);

	return <convoContext.Provider value={{messages,setMessages,selectedConversation,setSelectedConversation}}>
		{children}
	</convoContext.Provider>
}

export default ConvoContextProvider;