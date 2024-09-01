const mongoose = require("mongoose")
const Schema = mongoose.Schema


const useraddScamea = new Schema({
    fullName:String,
    email:String,
    body:String,
    
})


const user = mongoose.model("user",useraddScamea)


module.exports = user