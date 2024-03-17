import mongoose from "mongoose";

const productScema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is a required feild"],
        trim: true
    },
    description: {
        type: String,
        require: [true, "description is a required feild"]
    },
    price: {
        type: Number,
        require: [true, "price is a required feild"],
        maxLength: [8, "price cannot exceed 8 figures"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    category: {
        type: String,
        require: [true, "product category is a required feild"]
    },
    stock: {
        type: Number,
        require: [true, "product stock is a required feild"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {   user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                require: true
            },
            comment: {
                type: String,
                require:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Product=mongoose.model("Product",productScema);

export default Product;