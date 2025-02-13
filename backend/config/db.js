const mongoose = require('mongoose')

const connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("db is connected")
    }).catch((err)=>{
        console.log("db error ", err)
    })
}

module.exports = connectToDB