const express = require("express")
//const cors = require("cors")

const mongoose = require("mongoose")
require("dotenv").config()
const helmet = require("helmet")
const morgan = require("morgan")
const app = express()

//connection wiith mongoose
mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB")
})

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.get("/", (req, res) => {
    res.send("Welcome to homepage!")
})

app.listen(5000, () => {
    console.log("Backend server is running!")
}) 