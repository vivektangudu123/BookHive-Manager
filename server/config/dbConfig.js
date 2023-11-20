const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
console.log(process.env.jwt_secret)
mongoose.connect("mongodb+srv://vivektangudu:viv@cluster0.czt49fi.mongodb.net/")

const connection = mongoose.connection;

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

connection.on('error' , (err)=>{
    console.log('Mongo DB Connection Failed');
})

module.exports = connection;