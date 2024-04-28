import mongoose from "mongoose";
const connectToMongoDB = async()=>{
    try{
        // await mongoose.connect(process.env.MONGO_DB_URI);
        await mongoose.connect("mongodb+srv://shiva:NGdiEjtGkAFRKJnL@cluster0.2dirsje.mongodb.net/chat_app?retrywrites=true&w=majority");
        console.log("connected to mongo db");
    }catch(error){
        console.log(`error connecting to db ${error.message}`)
    }
}

export default connectToMongoDB;