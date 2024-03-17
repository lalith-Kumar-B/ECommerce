import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


async function newOrder(req,res,next) {
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    const order= await Order.create({shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id});
    res.json({success:true,order});
}

async function getSingleOrder(req,res,next) {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if (!order) {
        return next(res.json({success:false,message:"order not found"}));
    }
    res.json({success:true,order});
}

async function myOrders(req,res,next) {
    const orders = await Order.find({user:req.user._id});
    res.json({success:true,orders});
}

async function getAllOrders(req,res,next){
    const orders = await Order.find();
    let totalAmount=0;
    orders.forEach(order=>totalAmount+=order.totalPrice);
    res.json({success:true,totalAmount,orders});
}

async function updateOrderStatus(req,res,next){
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.json({success:false,message:"there is no product with this perticular id"});
        }

        if (order.orderStatus=="Delivered") {
            return res.json({success:false,message:"you have alredy delivered this order"});
        }
        
        order.orderStatus=req.body.status;
        if (req.body.status==='Delivered') {
            order.orderItems.forEach(async(o)=>{
                await updateStock(o.product,o.quantity);
            });
            order.deliveredAt=new Date(Date.now());
        }
        await order.save();
        res.json({success:true,order});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

async function deleteOrder(req,res,next){
    const _order = await Order.findById(req.params.id);
    if (!_order) {
        return next(res.json({success:false,message:"the order dosent exist"}));
    }

    await Order.deleteOne({_id:req.params.id});
    res.json({success:true,message:"order deleted successfully"});
}

async function updateStock(id,quantity) {
    const product = await Product.findOne({_id:id});
    if (product) {
        product.stock-=quantity;
        await product.save({validateBeforeSave:false});
    }
}

export {newOrder,getSingleOrder,myOrders,getAllOrders,updateOrderStatus,deleteOrder};