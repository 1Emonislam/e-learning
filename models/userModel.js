const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide First Name']
    },
    password: {
        type: String,
    },
    lastName: {
        type: String,
        default: 'N/A'
    },
    email: {
        type: String,
        required: [true, 'Please provide Email'],
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide Phone Number']
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'block', 'pending'],
        default: 'active'
    },
    pic: {
        type: String,
        default: 'https://i.ibb.co/BGbPkX9/dummy-avatar-300x300-1.jpg'
    },
    username: {
        type: String,
        lowercase: true
    },
    bkashTrans: {
        type: String,
        required: [true, 'Please provide Bkash Trans Id']
    }
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)
module.exports = User;