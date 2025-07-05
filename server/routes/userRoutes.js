const express = require('express');
const { registerUser, loginUser, logout, registerAdmin, loginStatus, getUserProfile, getCustomers } = require('../controllers/userController');
const { protect, adminProtect } = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/logout', logout)


router.post('/', registerUser);
router.post('/registerAdmin', registerAdmin);
router.post('/login', loginUser)
router.get('/loginStatus',loginStatus)

router.get("/getProfile",protect,getUserProfile )
router.get("/customers",adminProtect,getCustomers )


module.exports = router;
