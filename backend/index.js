const express=require("express")
const app = express()
const session=require("express-session")

const UserRoute=require("./routes/user")
const TaskRoute=require("./routes/task")
const Payment=require("./routes/payment")
app.use(express.json())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },saveUninitialized: true,resave: true } ))

app.use("/auth",UserRoute)
app.use("/task",TaskRoute)
app.use("/payment",Payment)





module.exports =app
