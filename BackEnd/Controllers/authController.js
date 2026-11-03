const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const makeAccountNumber = () => `KUB${Date.now().toString().slice(-8)}${Math.floor(10 + Math.random()*90)}`;
const publicUser = user => ({ id:user._id, name:user.name, email:user.email, phone:user.phone, accountNumber:user.accountNumber, balance:user.balance, role:user.role, status:user.status });

async function register(req,res){
  try {
    const { name, email, phone, password } = req.body;
    if(!name || !email || !phone || !password) return res.status(400).json({message:'All fields are required'});
    if(password.length < 6) return res.status(400).json({message:'Password must contain at least 6 characters'});
    if(await User.findOne({email})) return res.status(409).json({message:'Email already registered'});
    const user = await User.create({name,email,phone,password:await bcrypt.hash(password,10),accountNumber:makeAccountNumber()});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(201).json({message:'Account created',token,user:publicUser(user)});
  } catch(e){res.status(500).json({message:e.message});}
}
 
async function login(req,res){
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({message:'Invalid email or password'});
    if(user.status==='blocked') return res.status(403).json({message:'Your account is blocked'});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({message:'Login successful',token,user:publicUser(user)});
  }catch(e){res.status(500).json({message:e.message});}
}

async function me(req,res){res.json({user:req.user});}
module.exports={register,login,me};
