const app=require("..//index")
const db=require("..//config/db")
const UserSchema=require("..//models/user")
const OtpSchema=require("..//models/otp")
const TaskSchema=require("..//models/task")
const PaymentSchema=require("..//models/payment")

require("dotenv").config()

const port=process.env.PORT||8000
UserSchema.hasMany(OtpSchema)
OtpSchema.belongsTo(UserSchema)
UserSchema.hasMany(TaskSchema)
TaskSchema.belongsTo(UserSchema)
UserSchema.hasOne(PaymentSchema)
PaymentSchema.belongsTo(UserSchema)

db.sync({force:false}).then((res)=>{
    console.log("database connection established")
    app.listen(port,async()=>{
        console.log(`listening on ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})



