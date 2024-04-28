import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) =>{
    try{
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
    
        let conversation =  await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })

        }
        // console.log(senderId);
        // console.log(receiverId)
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        } 
        // await conversation.save();
        // await newMessage.save(); 
        
        //this run in parallel
        await Promise.all([conversation.save(),newMessage.save()])
        //SOCKOT IO Functionality will go on
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(200).send(newMessage);

    }catch(error){

    }

}

export const getMessages = async (req,res) =>{

    try{

        const { id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all:[ senderId,userToChatId]}
        }).populate("messages");
        if(!conversation) return res.status(200).send([]);
        const messages = conversation.messages;  
        res.status(200).send(messages);
    }catch(error){

    }
}
