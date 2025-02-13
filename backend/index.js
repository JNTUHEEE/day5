const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const flames = require("./models/flames.js")
const connectToDB = require("./config/db.js")


dotenv.config();

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectToDB();

app.get('/',(req,res)=>{
    res.json({message:"Evry thing fine yarrr"})
})

app.post('/flames',async(req,res)=>{
    let {firstname,secondname} = req.body;
    let newOne = await flames.create({
        firstname,secondname
    })
    res.json({newOne})
})



let PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is listening on port: ${PORT}`)
})