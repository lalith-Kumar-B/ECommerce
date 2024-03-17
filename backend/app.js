import express from "express";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js"
import paymentRoute from "./routes/paymentRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";

const app=express();
app.use(bodyParser.json({limit:'35mb'}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true,limit:'35mb',parameterLimit:50000}));
app.use(fileUpload());

app.use("/api/v1",productsRouter);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",paymentRoute);

app.use(express.static(path.join(process.cwd(), "/frontend/build")));
app.get('*',(req,res)=>{
    res.sendFile(path.join(process.cwd(), "/frontend/build/index.html"));
});

export default app;