import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}= req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords wont match"})
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username Already Exist"});

        }

        //Hash Password Here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}&size=200`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}&size=200`;
        
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            profilePic:gender === "male" ? boyProfilePic: girlProfilePic ,
            gender,

        })
        if(newUser){

            generateTokenAndSetCookie(newUser._id,res); 
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName,
                username,
                profilePic:newUser.profilePic,
            });
        }else{
            res.status(201).json({
                error:"Invalid userdata"
            })
        }
    } catch(error){
        console.log("Error in signup controller",error);
        res.status(500).json({error:"internal Server Error"});
    }
}
export const login= async (req,res)=>{
    try{
        console.log("came");
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || " ");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
        return;
    }catch(error){
        console.log("Error in login controller",error.message);
        // res.sendStatus(500).json({error:"Internal Serer Error"});
        return ;
    }

}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});

        res.status(200).send({message:"Logged out successfully"});
        return ;
    }catch(error){
        res.status(500).send("Error in logout controller  ")
    }
}
