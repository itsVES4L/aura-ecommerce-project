import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
 
    alert('Registration functionality is for demonstration purposes.');
  };

  return (
    <div className="bg-bg flex items-center justify-center py-20">
      <div className="container max-w-md mx-auto px-5">
        <div className="bg-surface p-8 rounded-2xl shadow-lg shadow-accent/5">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text">Create Your Account</h1>
            <p className="text-muted">Join the AURA community to start shopping.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-muted">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-muted">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-muted">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-accent text-bg font-bold uppercase tracking-wider py-3 rounded-lg transition-opacity hover:bg-opacity-80"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;