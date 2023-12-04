const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
console.log(process.env.jwt_secret)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: process.env.MONGO_USERNAME, // Replace with your actual username
        password: process.env.MONGO_PASSWORD, // Replace with your actual password
    }
});


const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
})

connection.on('error', (err) => {
    console.log('Mongo DB Connection Failed');
})

module.exports = connection;