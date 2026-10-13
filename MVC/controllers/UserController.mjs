
import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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


//login 10-10-26

const Login = async (req, res) => {
//exception handling
try {
    const data = req.body;
    const checkUser= await User.findOne({email: data.email})

    if (checkUser.length == 0) {
        res.status(200).json({msg:"Account does not exists. Please Signup"})
        
    } else {
//                                                string              hash
        const verifyPassword= bcrypt.compareSync(data.password, checkUser.password);
        if (verifyPassword) {

              const token = await jwt.sign( {checkUser} , process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        console.log(token);


            res.status(200).json({msg:"Login Success..!", user:checkUser,token:token})    
            } else {
            res.status(200).json({msg:"Invalid Credentials . Please try again..!"}) 
        }
    }

} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}


//change activation status
const ChangeActivationStatus = async (req, res) => {
//exception handling
try {

const userId= req.params.id;
const status= req.query.status=="active" ? true : false;

const updateUser = await User.updateOne({_id:userId},{isActive:status});
    if (updateUser) {
        res.status(200).json({msg:"Account status updated successfully"})
        
    } else {
        res.status(200).json({msg:"Failed to update account status"})
                                           
    }


} catch (error) {
  console.log(error)
  res.status(500).json({error:error.msessage})
}
}


const userController ={
    Signup,
    Login,
    ChangeActivationStatus
   
}

export default userController;

