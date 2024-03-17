import express from "express"
import { processPayment,sendStripeApiKey } from "../controllers/paymetController.js";
import {isAuthenticatedUser} from "../middlewares/auth.js"

const paymentRoute = express.Router();

paymentRoute.post("/payment/process",isAuthenticatedUser, processPayment);

paymentRoute.get("/stripeapikey",isAuthenticatedUser, sendStripeApiKey);

export default paymentRoute;