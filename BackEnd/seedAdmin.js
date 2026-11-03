require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./Models/User');
(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const email = process.env.ADMIN_EMAIL || 'admin@kubhera.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';
    const exists = await User.findOne({ email });
    if (exists) {
        console.log('Admin already exists:', email)
    } else {
        await User.create({
            name: 'Kubhera Admin',
            email, phone: '9999999999',
            password: await bcrypt.hash(password, 10),
            accountNumber: 'KUBADMIN001',
            role: 'admin',
            balance: 0
        });
        console.log('Admin created:', email, 'password:', password)
    }
    await mongoose.disconnect()
})().catch(e => {
    console.error(e); process.exit(1)
});
