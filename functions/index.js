/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express =require("express")
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config() //this will import the hidden keys in .env file
const stripe=require("stripe")(process.env.STRIPE_KEY)


const app=express()
app.use(cors({
    origin:true
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success! ",
    })
})



app.post("/payment/create",async(req,res)=>{
    const total=parseInt(req.query.total);
    if(total>0){
        const paymentintent= await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        })
        // console.log("payment recieved",total);
        // res.send(total);

        res.status(201).json({
            clientsecret:paymentintent.client_secret,
        })
    }
    else{
        res.status(400).json({
            message:"failed",
        })
    }
})


//instead of using a listen method for express we can use onrequest method that provided by the firebase so that it can give us the port of backend.

exports.api=onRequest(app);
// console.log(exports.api);



