const razorpay=require("razorpay")
require("dotenv").config()
const Payment=require("..//models/payment")
const User=require("..//models/user")
const { Op } = require("sequelize")

const PaymentController=async (req,res)=>{
    try{
        const user=req.user

        const rzp=new razorpay({
            key_id:process.env.RAZOR_ID,
            key_secret:process.env.RAZOR_SECRET
            
        })

        const rzpOrder=await rzp.orders.create({
            amount:2500,
            currency:'INR',
        })
        const payment=await Payment.create({
            orderId:rzpOrder.id,
            paymentStatus:"pending",
            UserId:user.id,
        })

        return res.status(200).send({payment,key_id:rzp.key_id})

    }
    catch(err){
        return res.status(500).send("bad request")
    }
}

const UpdatePayment=async (req,res)=>{
    try{

        const user=req.user
        await Payment.update({paymentId:req.body.paymentId,paymentStatus:req.body.paymentStatus},{
            where:{
                [Op.and]:[{orderId:req.body.orderId},{UserId:user.id}]
            }
        })
        await User.update({isPremium:true},{
            where:{
                id:user.id,
            }
        })

        return res.status(200).send("Your are premium membership")

    }
    catch(err){
        return res.status(500).send("bad request")
    }
}

module.exports={PaymentController,UpdatePayment}

