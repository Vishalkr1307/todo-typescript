const {body,validationResult}=require("express-validator")

const formatOferror = (errorOfArray) => {
    return errorOfArray.map((err) => err.msg);
  };
const nameChain=()=>body("name").notEmpty().withMessage("Name not be empty").isString().withMessage("Name must be a string")
const emailChain=()=>body("email").notEmpty().withMessage("email not be empty").isEmail().withMessage("it must be a email")
const passwordChain=()=>body("password").notEmpty().withMessage("Password not be empty").isString().isLength({min:6})
const otpChain=()=>body("otp").notEmpty().withMessage("otp not be empty").isString().isLength({min:4,max:4}).withMessage("otp must have 4 characters")
const titleChain=()=>body("title").notEmpty().withMessage("title not be empty").isString().withMessage("It must be a string")
const amountChain=()=>body("amount").notEmpty().withMessage("amount not be empty").isNumeric().withMessage("It must be a number")
const descriptionChain=()=>body("description").notEmpty().withMessage("description not be empty").isString().withMessage("It must be a string")
const categoryChain=()=>body("category").notEmpty().withMessage("category not be empty").isString().withMessage("It must be a string")

module.exports={formatOferror,emailChain,nameChain,passwordChain,validationResult,otpChain,titleChain,amountChain,descriptionChain,categoryChain}