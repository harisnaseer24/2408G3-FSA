import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

 const auth = async(req,res, next)=>{

   try {
     const authHeader= req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(400).json({message:"No authentication token found...!"})
    }
    
// "haris naseer".split(" ") = > ["haris", "naseer"]
// "Bearer token".split(" ") = > ["Bearer", "token"]
    const token= authHeader.split(" ")[1]
    console.log("token",token);
    const decode= await jwt.verify(token,process.env.JWT_SECRET);
    console.log("decode", decode)
        req.user= decode
        next()
   } catch (error) {
     res.status(500).json({message:error})
   }

}

export default auth;
