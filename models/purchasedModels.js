const { mongoose, Schema } = require('mongoose');
const coursePurchasedSchema = mongoose.Schema({
    status: {
        type: String,
        default: 'pending',
        enum: ['active', 'inactive', 'block', 'paid', 'unpaid'],
        default: 'pending'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    bkashTrans: {
        type: String,
        require: [true, 'Please Provide Your Course Purchased Bkash Trans Id']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})
const CoursePurchased = mongoose.model("CoursePurchased", coursePurchasedSchema);
module.exports = CoursePurchased;