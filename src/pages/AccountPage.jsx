import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, removeFromWishlist } from '../app/authSlice';
import ProductCard from '../components/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, wishlist } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to homepage after logout
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (!user) {
    // This should ideally not be reached due to ProtectedRoute, but it's a good fallback
    return <p>Loading user data...</p>;
  }

  return (
    <div className="bg-bg py-16">
      <div className="container max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-2">My Account</h1>
          <p className="text-lg text-muted">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Details Card */}
          <div className="lg:col-span-1 bg-surface p-8 rounded-2xl h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold mb-6">Account Details</h2>
            <div className="space-y-4 text-muted">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-8 bg-red-600 text-white font-bold uppercase tracking-wider py-3 rounded-lg transition-opacity hover:bg-opacity-80"
            >
              Logout
            </button>
          </div>

          {/* Wishlist Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {wishlist.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-4 right-4 bg-surface p-2 rounded-full text-muted hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      title="Remove from Wishlist"
                    >
                      <FontAwesomeIcon icon={faHeartCrack} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface p-8 rounded-2xl text-center">
                <p className="text-muted">Your wishlist is empty. Start adding some products!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;