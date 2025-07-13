import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../app/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would verify credentials against an API
    // For this demo, we'll use mock user data
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: e.target.email.value,
      username: 'johndoe',
    };
    dispatch(loginSuccess(mockUser));
    // Redirect the user back to the page they came from, or to the homepage
    navigate(from, { replace: true });
  };

  return (
    <div className="bg-bg flex items-center justify-center py-20">
      <div className="container max-w-md mx-auto px-5">
        <div className="bg-surface p-8 rounded-2xl shadow-lg shadow-accent/5">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text">Welcome Back</h1>
            <p className="text-muted">Login to access your account and orders.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-muted">Email Address</label>
              <input type="email" id="email" name="email" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-muted">Password</label>
              <input type="password" id="password" name="password" required className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-accent hover:underline">Forgot password?</a>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-accent text-bg font-bold uppercase tracking-wider py-3 rounded-lg transition-opacity hover:bg-opacity-80">Login</button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-accent hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;