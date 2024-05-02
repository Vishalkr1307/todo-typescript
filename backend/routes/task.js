const express=require("express")
const router=express.Router()
const {titleChain,amountChain,descriptionChain,categoryChain}=require("..//util/valdation")
const {AddTask,GetTask,SingleTask,UpdataTask,DeleteTask}=require("..//controllers/taskController")
const authoncation=require("..//middlewares/authoncation")

router.post("/addTask",authoncation,titleChain(),amountChain(),descriptionChain(),categoryChain(),AddTask)
router.get("/getTask",authoncation,GetTask)
router.get("/getTask/:id",authoncation,SingleTask)
router.patch("/updateTask/:id",authoncation,UpdataTask)
router.delete("/deleteTask/:id",authoncation,DeleteTask)

module.exports=router
