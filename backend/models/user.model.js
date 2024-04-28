import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },

    username:{
        type:String,
        required : true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender: {
        type: String,
        required: true,
        enum: {
          values: ["male", "female"],
          message: 'Please select a valid gender option.' // Custom error message
        }
      },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps:true})

const User = new mongoose.model("User",userSchema);

export default User; 