import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // FastAPI expects form-data for OAuth2 login (username & password)
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await axios.post('https://agency-saas-backend-2flg.onrender.com/', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Token save karna aur Dashboard pe bhejna
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_role', response.data.user_role);
        localStorage.setItem('isLoggedIn', 'true'); // NEW LOGIC ADDED HERE
        navigate('/dashboard'); // Redirect to dashboard after login
        
      } else {
        // Signup expects JSON body
        await axios.post('https://agency-saas-backend-2flg.onrender.com/', {
          email: email,
          full_name: fullName,
          password: password,
          role: 'agency'
        });

        alert('Account Created! Please login now.');
        setIsLogin(true); // Switch to login after signup
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')} 
        style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: '500' }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '40px', borderRadius: '24px' }}>
        
        {/* Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '24px', marginBottom: '16px' }}>
            <Layers style={{ color: 'var(--primary)' }} size={32} />
            <span className="text-gradient">AgencySaaS</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            {isLogin ? 'Welcome back' : 'Create your agency account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start automating your workflow today.'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #f87171' }}>
            {error}
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@agency.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Auth;