const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
console.log(process.env.jwt_secret)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
})

connection.on('error', (err) => {
    console.log('Mongo DB Connection Failed');
})

module.exports = connection;