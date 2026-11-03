const router=require('express').Router();
const {protect,adminOnly}=require('../Middleware/auth');
const {transfer,myTransactions,adminTransactions}=require('../Controllers/transactionController');
router.post('/transfer',protect,transfer); router.get('/mine',protect,myTransactions); router.get('/all',protect,adminOnly,adminTransactions);
module.exports=router;
