const { mongoose, Schema } = require('mongoose');
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Type a Course Title']
    },
    details: {
        type: String,
        trim: true,
        required: [true, 'Please Type a Description']
    },
    img: {
        type: String,
        required: [true, 'Please Select a Image']
    },
    video: {
        type: String,
    },
    videoGallery: {
        type: Array
    },
    imgGallery: {
        type: Array
    },
    status: {
        type: String,
        default: 'active'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;