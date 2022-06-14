const Course = require("../models/courseModels");
const CoursePurchased = require("../models/purchasedModels");
module.exports.coursePurchasedCreate = async (req, res, next) => {
    try {
        const { status, courseId, bkashTrans } = req.body;
        if (!req.user?._id) {
            return res.status(400).json({ error: { email: 'Permission Denied! Please Login' } })
        }
        const course = await CoursePurchased.create({ status, bkashTrans, courseId, author: req.user?._id });
        return res.status(200).json({ course: course })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getCoursePurchasedSearch = async (req, res, next) => {
    let { page = 1, status, limit = 10 } = req.query;
    limit = parseInt(limit)
    const keyword = req.query.search ? {
        $or: [
            { status: { $regex: req.query.search, $options: "i" } },
            { bkashTrans: { $regex: req.query.search, $options: "i" } },
        ],
        author: req.user?._id,
    } : { status: status || 'paid', author: req.user?._id };
    try {
        const course = await CoursePurchased.find(keyword).populate('courseId').populate("author", "_id firstName lastName username status bkashTrans pic").sort("-createdAt").limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await CoursePurchased.find(keyword).sort("-createdAt").count()
        return res.status(200).json({ message: 'Course Search list Founds', course: course, count: count })
    }
    catch (error) {
        next(error)
    }
}

module.exports.singlePurchasedCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.user?._id) {
            return res.status(400).json({ error: { email: 'Please Provide Your Valid User credentials' } })
        }
        const course = await CoursePurchased.findOne({ _id: id, author: req.user?._id }).populate('courseId').populate("author", "_id firstName lastName username status bkashTrans pic");
        return res.status(200).json({ course: course || {} })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updatePurchasedCourse = async (req, res, next) => {
    try {
        const { bkashTrans, status } = req.body;
        const { id } = req.params;
        const course = await CoursePurchased.findOneAndUpdate({ _id: id }, {
            status, bkashTrans
        }, { new: true }).populate('courseId').populate("author", "_id firstName lastName username status bkashTrans pic");
        return res.status(200).json({ message: 'Purchased Course status successfully updated!', course })
    }
    catch (error) {
        next(error)
    }
}
