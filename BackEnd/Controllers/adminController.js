const User=require('../Models/User');
const Transaction=require('../Models/Transaction');
async function stats(req,res){
 const [customers,transactions]=await Promise.all([User.countDocuments({role:'customer'}),Transaction.countDocuments()]);
 const agg=await User.aggregate([{$group:{_id:null,total:{$sum:'$balance'}}}]);
 res.json({customers,transactions,totalDeposits:agg[0]?.total||0});
}
async function customers(req,res){res.json({customers:await User.find({role:'customer'}).select('-password').sort({createdAt:-1})});}
async function updateStatus(req,res){const user=await User.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true}).select('-password'); if(!user)return res.status(404).json({message:'Customer not found'}); res.json({user});}
module.exports={stats,customers,updateStatus};
