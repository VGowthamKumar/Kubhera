import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Transfer from './pages/Transfer/Transfer';
import Transactions from './pages/Transactions/Transactions';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import './main.css';
function Protected({ children, admin = false }) { const { user, loading } = useAuth(); if (loading) return <div className="screen-center">Loading Kubhera...</div>; if (!user) return <Navigate to="/login" replace />; if (admin && user.role !== 'admin') return <Navigate to="/dashboard" replace />; return children }
export default function App() {
    return <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
                <Route path="/transfer" element={<Protected><Transfer /></Protected>} />
                <Route path="/transactions" element={<Protected><Transactions /></Protected>} />
                <Route path="/profile" element={<Protected><Profile /></Protected>} />
                <Route path="/admin" element={<Protected admin><AdminDashboard /></Protected>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
}
