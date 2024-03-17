import express from "express";
import {authoriseRoles, isAuthenticatedUser} from "../middlewares/auth.js";
import {register,login,logout,fergotPassword,resetPassword,getUserDetails,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,deleteUserProfile} from "../controllers/userController.js";

const userRoute=express.Router();


userRoute.post("/register",register);

userRoute.post("/login",login);

userRoute.post("/password/fergotpassword",fergotPassword);

userRoute.put("/password/reset/:token",resetPassword);

userRoute.put("/password/update",isAuthenticatedUser,updatePassword);

userRoute.get("/me",isAuthenticatedUser,getUserDetails);

userRoute.put("/me/update",isAuthenticatedUser,updateProfile);

userRoute.get("/admin/users",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),getAllUsers);

userRoute.get("/admin/user/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),getSingleUser);

userRoute.put("/admin/user/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),updateUserRole);

userRoute.delete("/admin/user/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),deleteUserProfile);

userRoute.get("/logout",logout);



export default userRoute;