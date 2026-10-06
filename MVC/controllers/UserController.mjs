
import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs'

//all products
const Signup = async (req, res) => {
//exception handling
try {


    const data = req.body;
    const checkUser= await User.find({email: data.email})

    if (checkUser.length > 0) {
        res.status(200).json({msg:"Account already exists. Please login"})
        
    } else {

// "abc" ----> Encoding --> Hashing Algorithm -- > "ahdfjkdh234232#%#$%#$%#$DFFF"

        const hashPassword= bcrypt.hashSync(data.password,10);
        console.log(hashPassword)

        const newUser= User({
            username:data.username,
            email:data.email,
            password:hashPassword,
            profilePicture:data.profilePicture
        })
        const addUser = await newUser.save();
        if (addUser) {
                res.status(200).json({msg:"Signup Success. Please login now", user:addUser})
                
            } else {
            res.status(200).json({msg:"Failed to Signup. Please try again..!"})
            
        }
        
    }

} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}




const userController ={
    Signup,
   
}

export default userController;

