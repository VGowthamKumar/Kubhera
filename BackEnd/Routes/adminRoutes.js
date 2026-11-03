const router=require('express').Router();
const {protect,adminOnly}=require('../Middleware/auth');
const {stats,customers,updateStatus}=require('../Controllers/adminController');
router.use(protect,adminOnly); router.get('/stats',stats); router.get('/customers',customers); router.patch('/customers/:id/status',updateStatus);
module.exports=router;
