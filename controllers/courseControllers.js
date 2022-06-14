const Course = require("../models/courseModels");

module.exports.courseCreate = async (req, res, next) => {
    try {
        const { title, details, status, img, video, videoGallery, imgGallery } = req.body;
        if (!req.user?._id) {
            return res.status(400).json({ error: { email: 'Permission Denied! Please Login' } })
        }
        const course = await Course.create({ title, status, details, img, video, videoGallery, imgGallery, author: req.user?._id });
        return res.status(200).json({ course: course })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getCourseSearch = async (req, res, next) => {
    let { page = 1, status, limit = 10 } = req.query;
    limit = parseInt(limit)
    const keyword = req.query.search ? {
        $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { details: { $regex: req.query.search, $options: "i" } },
            { status: { $regex: req.query.search, $options: "i" } },
        ],
    } : { status: status || 'active' };
    try {
        const course = await Course.find(keyword).sort("-createdAt").limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await Course.find(keyword).sort("-createdAt").count()
        return res.status(200).json({ message: 'Course Search list Founds', course: course, count: count })
    }
    catch (error) {
        next(error)
    }
}

module.exports.singleCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findOne({ _id: courseId });
        return res.status(200).json({ course: course || {} })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateCourse = async (req, res, next) => {
    try {
        const { title, details, status, img, video, videoGallery, imgGallery } = req.body;
        const { courseId } = req.params;
        const course = await Course.findOneAndUpdate({ _id: courseId }, {
            title, details, status, img, video, videoGallery, imgGallery
        }, { new: true });
        return res.status(200).json({ message: 'Course Update successfully!', course })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteCourse = async (req, res, next) => {
    try {
        if (!req.user._id) {
            return res.status(400).json({ error: { email: 'user does not exists!' } })
        }
        const { courseId } = req.params;
        const course = await Course.deleteOne({ _id: courseId, author: req.user?._id })
        if (course?.deletedCount === 1) {
            res.status(200).json({ error: { course: 'Course Removed Sucessfullly!' } });
        } else {
            res.status(400).json({ error: { course: 'Course Removed Failed!' } });
        }
    }
    catch (error) {
        next(error)
    }
}