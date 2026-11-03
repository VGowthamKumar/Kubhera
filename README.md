# Kubhera Digital Banking

A full-stack banking demo built from the original Kubhera React/Vite project.

## Stack
- React + Vite
- React Router
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing

## Run locally

### 1. Backend
```bash
cd BackEnd
npm install
copy .env.example .env
```
Update `MONGO_URI` and `JWT_SECRET` in `.env`.

Then:
```bash
npm run dev
```

Backend runs on `http://localhost:8080`.

### 2. Frontend
```bash
cd FrontEnd
npm install
copy .env.example .env
npm run dev
```

Frontend runs on the Vite URL, normally `http://localhost:5173`.

## Create admin
After MongoDB is connected:
```bash
node seedAdmin.js
```
Default admin credentials are `admin@kubhera.com` / `Admin@123` unless `ADMIN_EMAIL` and `ADMIN_PASSWORD` are supplied in `.env`.

## Main flows
- Landing page
- Customer registration/login
- JWT protected dashboard
- Account balance
- Customer-to-customer transfers
- Transaction history
- Profile
- Admin dashboard
- Customer blocking/unblocking

This is a portfolio/demo banking application; it is not connected to real banking rails or payment networks.
