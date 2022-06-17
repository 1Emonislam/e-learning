const mongoose = require('mongoose');
const connectDB =async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log('server connected Mongodb')
    }
    catch (error) {
        console.log(error.message,'DB error')
    }
}
module.exports = connectDB;