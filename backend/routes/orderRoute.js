import express  from "express";
import {newOrder,getSingleOrder,myOrders,getAllOrders,updateOrderStatus,deleteOrder} from "../controllers/orderController.js";
import { authoriseRoles, isAuthenticatedUser } from "../middlewares/auth.js";
// (req,res,next)=>authoriseRoles(req,res,next,"admin")


const orderRoute=express.Router();

orderRoute.post("/order/new",isAuthenticatedUser,newOrder);

orderRoute.get("/order/:id",isAuthenticatedUser,getSingleOrder);

orderRoute.get("/orders/me",isAuthenticatedUser, myOrders);

orderRoute.get("/admin/orders",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"), getAllOrders);

orderRoute.put("/admin/orders/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),  updateOrderStatus);

orderRoute.delete("/admin/orders/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),  deleteOrder);


export default orderRoute;