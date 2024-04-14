import dotenv from "dotenv";
dotenv.config({path:"backend/config/config.env"});
import app from "./app.js";
import { connectDatabse } from "./config/database.js";
import cloudinary from "cloudinary"

connectDatabse();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
app.listen(process.env.PORT,()=>{
    console.log("Backend listening on port : "+process.env.PORT);
});