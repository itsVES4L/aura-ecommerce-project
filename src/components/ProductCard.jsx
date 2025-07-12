import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = (e) => {
    // This prevents the Link navigation from firing when the button is clicked
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    // The main container with new rounded corners and hover effects
    <div className="bg-surface rounded-2xl flex flex-col overflow-hidden border border-transparent transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5">
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
        </div>

        {/* Info Container with more padding */}
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

          {/* The button is now always visible and part of the normal layout flow */}
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