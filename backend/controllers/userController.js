const { formatOferror } = require("..//util/valdation");
const User = require("..//models/user");
const OtpSchema = require("..//models/otp");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const sentMail = require("..//util/mail");
const {newToken}=require("..//util/token")
const {Op}=require("sequelize")

const Register = async (req, res) => {
  try {
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOferror(error.array()).join(","));
    }
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(401).send("Email is already in use");
    }

    user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("bad request");
  }
};
const Login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOferror(error.array()).join(","));
    }
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!matchPassword) {
      return res.status(401).send("Password does not match");
    }

    const sendData = await sentMail(user.email);

    return res.status(200).send(sendData);
  } catch (err) {
    console.log(err);
    return res.status(500).send("bad request");
  }
};

const Otp = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOferror(error.array()).join(","));
    }
    const id = req.params.id;
    const otpData = await OtpSchema.findAll({
      where: {
        UserId: id,
      },
    });
    if (otpData.length == 0) {
      return res.status(401).send("User not found");
    }
    const { otp, expiredAt } = otpData[otpData.length - 1];
    if (new Date().getTime() > new Date(expiredAt).getTime()) {
      await OtpSchema.destroy({
        where: {
          UserId: id,
        },
      });

      return res.status(401).send("You Otp has expired");
    } else {
      const matchOtp = bcrypt.compareSync(req.body.otp, otp);
      if (!matchOtp) {
        return res.status(401).send("You otp has incorrect");
      } else {
        await OtpSchema.destroy({
          where: {
            UserId: id,
          },
        });
        await User.update(
          { verifya: true },
          {
            where: {
              id: id,
            },
          }
        );
        const user=await User.findOne({where:{
            id: id,
        }})

        const token=newToken(user)

        

        return res.status(200).send({status:"Your Account has been verified",token});
      }
    }
  } catch (err) {
    return res.status(500).send("bad request");
  }
};

const ResendOtp=async (req,res)=>{
    try{

        const id=req.params.id;
        const user=await User.findByPk(id)
        if(!user){
            return res.status(404).send("user not found");
        }
        const sendData=await sentMail(user.email)

        return res.status(200).send(sendData)



    }
    catch(err){
        return res.status(500).send("bad request");
    }
}
const ForgetPassword=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))

        }
        const user=await User.findOne({where:{
            [Op.or]:[{email:req.body.email},{name:req.body.email}]
        }})
        if(!user){
            return res.status(401).send("User not found")

        }
        const sendData=await sentMail(user.email)

        return res.status(200).send(sendData)


    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

const ResetPassword=async (req, res) => {
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))

        }
        const user=await User.findByPk(req.params.id)
        if(!user){
            return res.status(404).send("user not found")

        }
        const updateUser=await User.update({password:req.body.password},{
            where:{
                id:req.params.id,
            }
        })
        console.log(updateUser)

        return res.status(200).send("Password updated successfully")

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}


module.exports = { Register, Login, Otp,ResendOtp,ForgetPassword,ResetPassword };
