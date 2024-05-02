const expres=require("express")
const router=expres.Router()
const passport=require("..//config/passport")

const {nameChain,emailChain,passwordChain,otpChain}=require("..//util/valdation")
const {Register,Login,Otp,ResendOtp,ForgetPassword,ResetPassword}=require("..//controllers/userController")
const User = require("../models/user")


router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/login",emailChain(),Login)
router.post("/otpverification/:id",otpChain(),Otp)
router.get("/otpverification/resendotp/:id",ResendOtp)
router.post("/forgetpassword",ForgetPassword)
router.post("/forgetpassword/resetpassword/:id",passwordChain(),ResetPassword)

passport.serializeUser(function({user,token},done){
    done(null,user.id)

})
passport.deserializeUser(async function (id,done){
   let user= await User.findByPk(id)
   done(null,user)


})

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'auth/login' }),
 async function(req, res) {
    const {user,token}=req.user
    
    return res.status(200).send({user,token})
  });

  router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  async function(req, res) {
    const {user,token}=req.user
    return res.status(200).send({user,token})
  });






module.exports=router