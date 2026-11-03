const router=require('express').Router();
const {register,login,me}=require('../Controllers/authController');
const {protect}=require('../Middleware/auth');
router.post('/register',register); router.post('/login',login); router.get('/me',protect,me);
module.exports=router;
