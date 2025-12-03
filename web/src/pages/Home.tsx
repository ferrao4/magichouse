import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
      <h1>🏠 Magic House</h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>
        Internal Communication Platform
      </p>
      
      <div style={{ marginTop: '40px' }}>
        <Link 
          to="/login"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Login
        </Link>
        
        <Link 
          to="/register"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#4caf50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Register
        </Link>
      </div>

      <div style={{ marginTop: '60px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>✅ System Status</h3>
        <p>✅ Frontend running on http://localhost:5174</p>
        <p>✅ Backend running on http://localhost:3000</p>
        <p style={{ marginTop: '20px' }}>
          <a href="http://localhost:3000/api/docs" target="_blank" rel="noopener noreferrer">
            📚 View API Documentation
          </a>
        </p>
      </div>
    </div>
  );
}
