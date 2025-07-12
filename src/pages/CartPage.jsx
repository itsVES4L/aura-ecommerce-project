import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../app/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto px-5 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="bg-accent text-bg font-bold uppercase tracking-wider py-3 px-8 transition-opacity hover:bg-opacity-80">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-surface border border-border">
              <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover" />
              <div className="flex-grow">
                <Link to={`/product/${item.id}`} className="font-bold text-text hover:text-accent">{item.title}</Link>
                <p className="text-muted text-sm">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border border-border w-28">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-lg hover:bg-border">-</button>
                <input type="text" value={item.quantity} readOnly className="w-full text-center bg-transparent py-1" />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-lg hover:bg-border">+</button>
              </div>
              <p className="font-bold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(item.id)} className="text-muted hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1 h-fit bg-surface p-6 border border-border lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Order Summary</h2>
          <div className="flex justify-between mb-4 text-muted">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-muted">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t border-border pt-4">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 bg-accent text-bg font-bold uppercase tracking-wider py-3 transition-opacity hover:bg-opacity-80">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;