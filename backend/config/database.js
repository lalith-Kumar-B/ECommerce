import dotenv from "dotenv";
dotenv.config({path:"backend/config/config.env"})
import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/ecommerse",{useNewUrlParser:true,useUndefinedTopology:true,useCreateIndex:true});


function connectDatabse() {
    mongoose.connect(process.env.DB_URI).then(
        () => { console.log("connected succesfully") }
    ).catch(err => {
        console.log(err);
    });   
}

export {connectDatabse};
