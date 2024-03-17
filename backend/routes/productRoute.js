import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct , getProductDetails ,createProductReview,getProductReviews,deleteReview,getAdminProducts} from "../controllers/productController.js";
import {isAuthenticatedUser,authoriseRoles} from "../middlewares/auth.js";

const productsRouter=express.Router();


productsRouter.get("/products",getAllProducts);

productsRouter.get("/admin/products",isAuthenticatedUser, (req,res,next)=>authoriseRoles(req,res,next,"admin"), getAdminProducts);

productsRouter.post("/admin/product/new",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),createProduct);

productsRouter.put("/admin/product/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),updateProduct);

productsRouter.delete("/admin/product/:id",isAuthenticatedUser,(req,res,next)=>authoriseRoles(req,res,next,"admin"),deleteProduct);

productsRouter.get("/product/:id",getProductDetails);

productsRouter.put("/review",isAuthenticatedUser,createProductReview);

productsRouter.get("/reviews",getProductReviews);

productsRouter.delete("/reviews",isAuthenticatedUser,deleteReview);


export default productsRouter;