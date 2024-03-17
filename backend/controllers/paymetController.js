import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function processPayment(req,res,next) {
    const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        metadata:{
            company:"Ecommerce"
        }
    });
    res.json({success:true,client_secret:myPayment.client_secret});
}

async function sendStripeApiKey(req,res,next){
    res.json({success:true,stripeApiKey:process.env.STRIPE_API_KEY});
}

export {processPayment,sendStripeApiKey}