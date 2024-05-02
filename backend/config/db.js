const {Sequelize}=require("sequelize")
require("dotenv").config()

const database=process.env.database
const user=process.env.USER.toString()

const PASSWORD=process.env.PASSWORD
const db=new Sequelize("todoTypeScript", "root", PASSWORD,{
    host: 'localhost',
    dialect:'mysql'

})

module.exports = db