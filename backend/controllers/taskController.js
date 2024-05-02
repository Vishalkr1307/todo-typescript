const Task=require("..//models/task")
const {validationResult}=require("express-validator")
const {formatOferror}=require("..//util/valdation")
const { Op } = require("sequelize")

const AddTask=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))
        }
        let user=req.user
        const task=await Task.create({...req.body,UserId:user.id})
        return res.status(201).send(task)

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

const GetTask=async (req, res) => {
    try{
        const user=req.user
        const task=await Task.findAll({where:{
            UserId: user.id

        }})

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

const SingleTask=async (req,res)=>{
    try{
        const user = req.user
        const task=await Task.findOne({
            where:{
                [Op.and]:[{UserId:user.id},{id:req.params.id}]
            }
        })

        return res.status(200).send(task)



    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

const UpdataTask=async (req, res) => {
    try{
        const user=req.user
        const task=await Task.update(req.body,{
            where:{
                [Op.and]:[{id:req.params.id},{UserId:user.id}]
            }
        })
        

        return res.status(200).send("task updated successfully")


    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

const DeleteTask=async (req, res) => {
    try{
        const user = req.user
        await Task.destroy({
            where:{
                [Op.and]:[{id:req.params.id},{UserId:user.id}]
            }
        })

        return res.status(200).send("Data deleted successfully")

    }
    catch(err){
        return res.status(500).send("bad request");
    }
}

module.exports={AddTask,GetTask,SingleTask,UpdataTask,DeleteTask}