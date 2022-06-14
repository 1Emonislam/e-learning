const { userRegister, userLogin, changedPassword, forgetPassword, resetPassword, logOut, updateProfile, currentProfileGet, allUserSearch, currentProfileGetSingle } = require('../controllers/userControllers');
const { protect } = require('../middlewares/protect');
const router = require('express').Router();
router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/update", protect, updateProfile)
router.post("/logout", protect, logOut)
router.put("/change-password", protect, changedPassword);
router.post("/forget-password", forgetPassword);
router.put("/reset-password", protect, resetPassword);
router.get("/profile", protect, currentProfileGet)
router.get("/profile/:userId", protect, currentProfileGetSingle)
router.get("/all/users/includes", protect, allUserSearch);
module.exports = router;