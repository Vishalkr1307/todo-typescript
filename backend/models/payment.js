const db=require("../config/db")
const {Sequelize,DataTypes}=require("sequelize")
const Payment=db.define("Payment",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    paymentId:{
        type:DataTypes.STRING,
        allowNull:true
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Payment
