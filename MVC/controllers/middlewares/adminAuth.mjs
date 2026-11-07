import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

 const adminAuth = async(req,res, next)=>{

   try {
     const authHeader= req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(400).json({message:"No authentication token found...!"})
    }
    
    const token= authHeader.split(" ")[1]

    const decode= await jwt.verify(token,process.env.JWT_SECRET);
   
} catch (error) {
     res.status(500).json({message:error})
   }

}

export default adminAuth;
