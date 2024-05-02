const express=require("express")
const router=express.Router()
const authenticate=require("..//middlewares/authoncation")
const {PaymentController,UpdatePayment}=require("..//controllers/paymentController")

router.get("/premium",authenticate,PaymentController)
router.patch("/updatePremium",authenticate,UpdatePayment)



module.exports=router