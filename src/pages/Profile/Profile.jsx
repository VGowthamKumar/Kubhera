import { Layout } from '../../components/BankNav';
 import { useAuth } from '../../context/AuthContext';
export default function Profile() { 
    const { user } = useAuth(); 
    return <Layout>
        <div className="card" style={{ maxWidth: 700 }}>
            <h1>Profile</h1>
            <p className="muted">Your Kubhera account information.</p>
            <div className="section">
                <div className="stat-label">Full name</div>
                <div className="stat-value">{user?.name}</div>
                </div>
                <div className="section">
                    <div className="stat-label">Email</div>
                    <div className="stat-value">{user?.email}</div>
                    </div>
                    <div className="section">
                        <div className="stat-label">Phone</div><div className="stat-value">{user?.phone}</div></div><div className="section"><div className="stat-label">Account number</div><div className="stat-value">{user?.accountNumber}</div></div><div className="section"><div className="stat-label">Role</div><div className="stat-value">{user?.role}</div></div></div></Layout> }
