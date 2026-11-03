import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Layout } from '../../components/BankNav';
export default function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const load = () => {
        Promise.all([api('/admin/stats'), api('/admin/customers')]).then(([a, b]) => {
            setStats(a);
            setCustomers(b.customers)
        }).catch(e => setError(e.message))
    };
    useEffect(load, []);
    const toggle = async (c) => {
        try {
            await api(`/admin/customers/${c._id}/status`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(
                        {
                            status: c.status === 'active' ? 'blocked' : 'active'
                        }
                    )
                }
            );
            load()
        }
        catch (e) { setError(e.message) }
    };
    return <Layout>
        <div className="welcome"><div>
            <p className="muted">Kubhera operations</p>
            <h1>Admin Dashboard</h1>
        </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="balance-grid">
            <div className="card">
                <div className="stat-label">Customers</div>
                <div className="stat-value">{stats.customers || 0}</div>
            </div>
            <div className="card">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{stats.transactions || 0}</div>
            </div>
            <div className="card">
                <div className="stat-label">Total balances</div>
                <div className="stat-value">₹{Number(stats.totalDeposits || 0).toLocaleString('en-IN')}</div>
            </div>
        </div>
        <section className="section">
            <div className="section-title">
                <h2>Customers</h2>
            </div>
            <div className="table-wrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Account</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{customers.map(c =>
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.accountNumber}</td>
                            <td>{c.email}</td>
                            <td>₹{c.balance.toLocaleString('en-IN')}</td>
                            <td>
                                <span className="badge">{c.status}</span>
                            </td>
                            <td>
                                <button onClick={() => toggle(c)}>{
                                    c.status === 'active' ? 'Block' : 'Unblock'
                                }
                                </button>
                            </td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>
            </div>
        </section>
    </Layout>
}
