require("dotenv").config();

const express = require('express')

const authRouter = require('./controller/authRouter')
const mainRouter = require('./controller/mainRouter')
const usersRouter = require('./controller/usersRouter')

const PORT = process.env.PORT || 5000
const connectToDB = require("./utils/dbConnect")
const ejs = require('ejs')
const path = require("path")



const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'Items.xlsx')))

connectToDB()

// app.use(express.json())
app.use("/",authRouter)
app.use("/main", mainRouter)
app.use("/main/users" , usersRouter)




app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})