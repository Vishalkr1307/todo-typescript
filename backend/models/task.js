const db=require("..//config/db")
const {Sequelize, DataTypes} =require("sequelize")

const Task=db.define("Task",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:[["petrol","food","salary"]]
        }
    },
    // totalAmount:{
    //     type:DataTypes.INTEGER,
    //     allowNull:true
    // }
})

// Task.beforeCreate(async (task,option)=>{
//     const UserId=task.UserId

//     const totalAmount = await Task.findAll({
//         attributes: [[Sequelize.fn('SUM', Sequelize.col("amount")), 'total']],
//         where: {
//             UserId: UserId
//         },
//         group: ['UserId']
//     });
    
    

//     task.setDataValue("totalAmount",totalAmount.length > 0 ? +totalAmount[0].dataValues.total+task.amount : task.amount)
    
// })

module.exports=Task