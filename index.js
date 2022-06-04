require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = 8081

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to the Database"))

app.use(cors())
app.use(express.json())

const subscribersRouter = require("./routes/subscribers")

app.use("/subscribers", subscribersRouter)

app.listen(PORT, () => {
  console.log("Welcome to the land of the free 🥳")
})
