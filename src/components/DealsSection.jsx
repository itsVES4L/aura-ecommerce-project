import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

// Helper function to format time for the countdown
const formatTime = (time) => time.toString().padStart(2, '0');

const DealsSection = ({ products }) => {
  // Set a target for the countdown timer (e.g., 24 hours from now)
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = useState(targetDate - new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  const hours = formatTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = formatTime(Math.floor((timeLeft / 1000 / 60) % 60));
  const seconds = formatTime(Math.floor((timeLeft / 1000) % 60));

  return (
 
    <section className="bg-surface rounded-2xl my-16 p-6 sm:p-8 border border-border">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faBolt} className="text-accent text-3xl" />
            <h2 className="text-3xl font-bold text-text">Amazing Deals</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-text font-mono text-xl">
              <span className="bg-border px-3 py-1.5 rounded-md">{hours}</span>:
              <span className="bg-border px-3 py-1.5 rounded-md">{minutes}</span>:
              <span className="bg-border px-3 py-1.5 rounded-md">{seconds}</span>
            </div>
            <Link to="/shop" className="text-accent font-semibold hover:underline whitespace-nowrap">
              View All →
            </Link>
          </div>
        </div>

        {/* Horizontally Scrolling Product List */}
        <div className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard
                product={{
                  ...product,
                  originalPrice: product.price * (1 + product.discountPercentage / 100),
                  tag: `${Math.round(product.discountPercentage)}% OFF`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;