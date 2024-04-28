import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userid,res) =>{
    const token = jwt.sign({userid},"SLDHQLDH",{
        expiresIn:'15d'
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, // to prevent Xss attacks cross-site scripting attacks
        sameSite :"strict", //CSRF attacks cross-site
        // secure : process.env.NODE_ENV !=="development" 
    });
}

export default generateTokenAndSetCookie