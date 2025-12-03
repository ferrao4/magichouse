import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string;
  role: string;
  status: string;
  jobTitle?: string;
  department?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await authApi.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {user && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2>Welcome, {user.firstName} {user.lastName}!</h2>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <p><strong>Organization ID:</strong> {user.orgId}</p>
            {user.jobTitle && <p><strong>Job Title:</strong> {user.jobTitle}</p>}
            {user.department && <p><strong>Department:</strong> {user.department}</p>}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>🎉 Welcome to Magic House!</h3>
        <p>Explore the features:</p>
        <div style={{ marginTop: '20px' }}>
          <Link
            to="/feed"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '500'
            }}
          >
            📱 Go to Feed
          </Link>
        </div>
        <ul style={{ marginTop: '20px' }}>
          <li>✅ Create posts and share updates</li>
          <li>✅ Comment on posts</li>
          <li>✅ Like posts</li>
          <li>✅ View company feed</li>
        </ul>
      </div>
    </div>
  );
}
