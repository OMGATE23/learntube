const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/user')
const connectToDB = require('./config/db')
require('dotenv').config()

connectToDB()


app.use(express.json())
app.use(cors())
app.use('/user' , userRoute)

app.listen(process.env.PORT , () => {
    console.log("Server is running on port " , process.env.PORT)
})

app.get('/' , (req,res) => {
    res.send('<h1>Welcome!</h1>')
})