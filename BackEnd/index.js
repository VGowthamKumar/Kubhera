require('dotenv').config();
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const adminRoutes = require('./Routes/adminRoutes');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Kubhera API' }));
app.use('/api/auth', authRoutes); app.use('/api/transactions', transactionRoutes); app.use('/api/admin', adminRoutes);
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Internal server error' }); });
const PORT = process.env.PORT || 8080;
connectDB().then(() => app.listen(PORT, () => console.log(`Kubhera API running on http://localhost:${PORT}`))).catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
