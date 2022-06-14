const express = require('express');
const { coursePurchasedCreate, getCoursePurchasedSearch, singlePurchasedCourse, updatePurchasedCourse } = require('../controllers/purchasedControllers');
const { purchasedProtected } = require('../middlewares/purchasedProtect');
const router = express.Router();
router.post('/', purchasedProtected, coursePurchasedCreate)
router.get('/', purchasedProtected, getCoursePurchasedSearch)
router.get('/:id', purchasedProtected, singlePurchasedCourse)
router.put('/:id', purchasedProtected, updatePurchasedCourse)
module.exports = router;