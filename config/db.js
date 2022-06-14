const mongoose = require('mongoose');
const connectDB =async () => {
    try {
       await mongoose.connect('mongodb://localhost:27017/e-learing');
       console.log('server connected Mongodb')
    }
    catch (error) {
        console.log(error.message)
        next(error)
    }
}
module.exports = connectDB;