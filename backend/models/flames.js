const mongoose = require('mongoose')

const FlamesSchema = new mongoose.Schema({
    firstname:String,
    secondname:String,
    created_at: {
        type:Date,
        default: new Date().getTime()
    }
})

module.exports = mongoose.model("flames",FlamesSchema)