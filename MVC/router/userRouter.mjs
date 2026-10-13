import express from 'express'

import userController from '../controllers/UserController.mjs';


const userRouter= express.Router();


userRouter
.post("/signup",userController.Signup)
.post("/login",userController.Login)
.patch("/change-activation-status/:id",userController.ChangeActivationStatus)


export default userRouter;