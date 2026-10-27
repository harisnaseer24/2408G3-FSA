
import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

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

// 15-10-26
const SendEmail = async (req,res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  let sendMailStatus= await transporter.sendMail({
    from: `"Verify Email" <${process.env.EMAIL_USER}>`,
  to:req.body.email,
 subject: req.body.subject,
    html:`<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>Welcome to HN Mart</title>
  <style>
    /* Email-safe, inline styles will be repeated in body where needed; include minimal in head */
    body { margin:0; padding:0; background-color:#f4f6f8; }
    img { border:0; display:block; }
    a { color:#1a73e8; text-decoration:none; }
  </style>
</head>
<body style='margin:0; padding:20px; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;'>
  <!-- Centering wrapper -->
  <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='max-width:680px; margin:0 auto;'>
    <tr>
      <td style='padding:24px 0; text-align:center;'>
        <!-- Card container -->
        <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 18px rgba(11, 22, 39, 0.06);'>

          <!-- Header / Logo -->
          <tr>
            <td style='padding:28px 28px 8px 28px; text-align:left;'>
              <img src='https://via.placeholder.com/160x40?text=HN+Mart' alt='HN Mart' width='160' style='display:block;'>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style='padding:12px 28px 0 28px;'>
              <h1 style='margin:0; font-size:22px; line-height:1.2; color:#0b2a48;'>Welcome to HN Mart, ${req.body.first_name} 🎉</h1>
              <p style='margin:12px 0 0 0; font-size:15px; color:#516276;'>Thanks for joining HN Mart — your friendly neighbourhood online store for quality groceries, home essentials, and daily deals. We’re excited to have you with us.</p>
            </td>
          </tr>

          <!-- Offer / CTA -->
          <tr>
            <td style='padding:18px 28px;'>
              <table role='presentation' cellpadding='0' cellspacing='0' width='100%'>
                <tr>
                  <td style='background:#f3f9ff; padding:16px; border-radius:8px; text-align:center;'>
                    <p style='margin:0; font-size:16px; color:#0b2a48;'><strong>Enjoy 15% off</strong> your first order — use code <span style='background:#e8f1ff; padding:4px 8px; border-radius:4px;'>WELCOME15</span></p>
                    <div style='height:12px;'></div>
                    <a href='{{cta_url}}' style='display:inline-block; padding:12px 20px; border-radius:8px; background:#0b79ff; color:#ffffff; font-weight:600; text-decoration:none;'>Start Shopping</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Highlights -->
          <tr>
            <td style='padding:10px 28px 22px 28px;'>
              <table role='presentation' cellpadding='0' cellspacing='0' width='100%'>
                <tr>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Fast delivery</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Get fresh items delivered to your door within hours.</p>
                  </td>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Best prices</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Daily deals and value packs for your budget.</p>
                  </td>
                </tr>
                <tr>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Easy returns</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Hassle-free returns within 7 days.</p>
                  </td>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Secure payments</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Multiple payment options with secure checkout.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Secondary CTA / Button -->
          <tr>
            <td style='padding:0 28px 20px 28px; text-align:center;'>
              <a href='{{shop_now_url}}' style='display:inline-block; padding:10px 18px; border-radius:8px; border:1px solid #0b79ff; color:#0b79ff; text-decoration:none; font-weight:600;'>Browse Categories</a>
            </td>
          </tr>

          <!-- Footer inside card -->
          <tr>
            <td style='padding:0 28px 28px 28px; font-size:13px; color:#8899aa;'>
              <p style='margin:0 0 8px 0;'>Need help? Reply to this email or visit our <a href='{{help_center_url}}'>Help Center</a>.</p>
              <p style='margin:0;'>Order tracking: <a href='{{tracking_url}}'>Track your orders</a></p>
            </td>
          </tr>

        </table>

        <!-- Small footer outside card -->
        <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='margin-top:12px;'>
          <tr>
            <td style='text-align:center; font-size:12px; color:#99a6b3;'>
              <p style='margin:6px 0 4px 0;'>Follow us</p>
              <!-- Social icons (these can be replaced with real icons) -->
              <p style='margin:0;'>
                <a href='{{facebook_url}}' style='margin:0 8px;'>Facebook</a> ·
                <a href='{{instagram_url}}' style='margin:0 8px;'>Instagram</a> ·
                <a href='{{twitter_url}}' style='margin:0 8px;'>X</a>
              </p>
              <p style='margin:10px 0 0 0;'>HN Mart • 123 Market Street • City, Country</p>
              <p style='margin:6px 0 0 0;'>If you prefer not to receive these emails, <a href='{{unsubscribe_url}}'>unsubscribe</a>.</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
  if(sendMailStatus){
    res.status(200).json({message:"Email sent successfully"})
}else{
      res.status(400).json({message:"Email sending failed"})

  }
};





//email sending



const userController ={
    Signup,
    Login,
    ChangeActivationStatus,
    SendEmail
   
}

export default userController;

