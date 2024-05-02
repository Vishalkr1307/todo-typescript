const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();
const UserSchema = require("..//models/user");
const OtpSchema = require("..//models/otp");

module.exports = async (email) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const user = await UserSchema.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const otp = Math.round(1000 + Math.random() * 9000).toString();

  const otpData = await OtpSchema.create({
    otp: otp,
    createdAt: Date.now(),
    expiredAt: Date.now() + (60 * 1000 + 2),
    UserId: user.id,
  });
  await otpData.save();

  const mailGenerator=new Mailgen({
    theme:"default",
    product:{
        name:"Todo TypeScript",
        link:process.env.URL
    }
  })
  var email = {
    body: {
        name:user.name,
        intro: 'Welcome to Todo-TypeScript! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Todo-TypeScript, please click here:',
            button: {
                color: '#22BC66',
                text: otp,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

var emailBody=mailGenerator.generate(email)
var emailtext=mailGenerator.generatePlaintext(email)

  const info = await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: user.email,
    subject: "Otp verification",
    html: emailBody,
    text: emailtext,
  });

  if(info.messageId){
     return {status:`Otp sent your ${user.email}`,UserId:user.id,email:user.email,expiredAt:otpData.expiredAt}
  }
 
  

  
};
