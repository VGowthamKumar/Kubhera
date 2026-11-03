const User = require('../Models/User');
const Transaction = require('../Models/Transaction');
const id = () => `TXN${Date.now()}${Math.floor(100+Math.random()*900)}`;

async function transfer(req,res){
  try{
    const { accountNumber, amount, description='' }=req.body;
    const value=Number(amount);
    if(!accountNumber || !Number.isFinite(value) || value<=0) return res.status(400).json({message:'Valid account number and amount are required'});
    if(accountNumber===req.user.accountNumber) return res.status(400).json({message:'Cannot transfer to your own account'});
    const receiver=await User.findOne({accountNumber});
    if(!receiver || receiver.status==='blocked') return res.status(404).json({message:'Recipient account not found'});
    const sender=await User.findById(req.user._id);
    if(sender.balance<value) return res.status(400).json({message:'Insufficient balance'});
    sender.balance-=value; receiver.balance+=value;
    await sender.save(); await receiver.save();
    const txn=await Transaction.create({transactionId:id(),from:sender._id,to:receiver._id,type:'transfer',amount:value,description});
    res.json({message:'Transfer successful',transaction:txn,balance:sender.balance});
  }catch(e){res.status(500).json({message:e.message});}
}

async function myTransactions(req,res){
  const txns=await Transaction.find({$or:[{from:req.user._id},{to:req.user._id}]}).populate('from','name accountNumber').populate('to','name accountNumber').sort({createdAt:-1});
  res.json({transactions:txns});
}

async function adminTransactions(req,res){res.json({transactions:await Transaction.find().populate('from','name accountNumber').populate('to','name accountNumber').sort({createdAt:-1})});}
module.exports={transfer,myTransactions,adminTransactions};
