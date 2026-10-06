import express from 'express'

import userController from '../controllers/UserController.mjs';


const userRouter= express.Router();


userRouter
.post("/signup",userController.Signup)


export default userRouter;