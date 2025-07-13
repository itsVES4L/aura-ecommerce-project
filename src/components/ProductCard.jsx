import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../app/cartSlice';
import { addToWishlist, removeFromWishlist } from '../app/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist, isAuthenticated } = useSelector((state) => state.auth);

  const isSale = product.originalPrice && product.originalPrice > product.price;
  
  // Check if the current product is in the wishlist
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Optionally, you could navigate to the login page here
      alert('Please log in to use the wishlist feature.');
      return;
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    // 1. Changed bg-surface to bg-bg for better contrast
    <div className="bg-bg rounded-2xl flex flex-col overflow-hidden border border-transparent transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5">
      <Link to={`/product/${product.id}`} className="block group">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Sale Tag */}
          {product.tag && (
            <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider text-bg rounded-md ${isSale ? 'bg-red-500' : 'bg-accent'}`}>
              {product.tag}
            </span>
          )}
          {/* 2. Updated Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            className="absolute top-4 right-4 bg-surface/70 backdrop-blur-sm p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <FontAwesomeIcon
              icon={isWishlisted ? faHeartSolid : faHeartRegular}
              className={isWishlisted ? 'text-red-500' : 'text-muted hover:text-accent'}
            />
          </button>
        </div>

        {/* Info Container */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-text mb-1 truncate" title={product.title}>
            {product.title}
          </h3>
          
          <p className="text-xl font-bold text-accent mb-4">
            {isSale && (
              <span className="text-base font-normal text-muted line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full mt-auto bg-border text-muted rounded-lg py-2.5 px-4 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-accent hover:text-bg"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;