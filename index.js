const express = require("express")

const app = express()

const mongoose = require("mongoose")

const cors = require("cors")

app.use(cors())

const userRouter = require("./routes/auth.route")

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.use("/api/v1/", userRouter)


require("dotenv").config()

const PORT  = process.env.PORT || 3000
// database 
const URL = process.env.MONGO_URL

app.get("/", (req, res) => {
    res.send("Welcome to the Authentication API");
});

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can"t find ${req.originalUrl} on this server!`
    })
})


mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology: true}).then(()=>{
    console.log(`database connected`)
}).catch((error)=>{
    throw error
})


app.listen(PORT,(req,res)=>{
    console.log(`server Started at ${PORT}`)
})