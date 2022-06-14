const express = require('express');
const { courseCreate, getCourseSearch, updateCourse, deleteCourse, singleCourse } = require('../controllers/courseControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, courseCreate);
router.get('/', getCourseSearch);
router.get('/:courseId', singleCourse);
router.put('/:courseId', protect, updateCourse)
router.delete('/:courseId', protect, deleteCourse)
module.exports = router;