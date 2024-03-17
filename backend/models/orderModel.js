import mongoose from "mongoose";

const orderScema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: Number, required: true }
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        }
    ],
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true }
    },
    payedAt: { type: Date, require: true },
    itemsPrice: { type: Number, default: 0,require:true },
    taxPrice: { type: Number, default: 0,require:true },
    shippingPrice: { type: Number, default: 0,require:true },
    totalPrice: { type: Number, default: 0,require:true },
    orderStatus: { type: String, default: "Processing",require:true },
    deliveredAt:Date,
    createdAt:{type:Date,default:Date.now}
});

const Order = mongoose.model("Order",orderScema);

export default Order;