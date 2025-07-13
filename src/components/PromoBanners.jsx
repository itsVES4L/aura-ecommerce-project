import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanners = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1: Gourmet Food / Groceries */}
        <Link 
          to="/shop?category=groceries" 
          className="block group rounded-2xl overflow-hidden relative h-72"
        >
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
            alt="Fresh Groceries Promotion" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-center items-center text-center transition-colors duration-300 group-hover:bg-black/60">
            <h3 className="text-4xl font-bold text-white">Fresh Selections</h3>
            <p className="text-white/80 mt-2 max-w-xs">Quality groceries delivered to your door.</p>
          </div>
        </Link>

        {/* Banner 2: Skincare / Beauty */}
        <Link 
          to="/shop?category=skincare" 
          className="block group rounded-2xl overflow-hidden relative h-72"
        >
          <img 
            src="https://images.unsplash.com/photo-1633793566189-8e9fe6f817fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8THV4dXJ5JTIwc2tpbiUyMGNhcmUlMjBQcm9tb3Rpb258ZW58MHx8MHx8fDA%3D" 
            alt="Luxury Skincare Promotion" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-center items-center text-center transition-colors duration-300 group-hover:bg-black/60">
            <h3 className="text-4xl font-bold text-white">Radiant Skincare</h3>
            <p className="text-white/80 mt-2 max-w-xs">Discover your perfect beauty routine.</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PromoBanners;