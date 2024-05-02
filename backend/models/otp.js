const db=require("..//config/db")
const {DataTypes}=require("sequelize")
const bcrypt=require("bcrypt")

const Otp=db.define("Otp",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    

    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false,
        set(val){
             this.setDataValue("otp",bcrypt.hashSync(val,8))
        }
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    expiredAt:{
        type:DataTypes.DATE,
        allowNull:false,
    }
})
module.exports=Otp