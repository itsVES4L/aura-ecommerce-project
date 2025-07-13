import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import DealsSection from '../components/DealsSection';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch all products if they haven't been fetched yet
    if (products.length === 0) {
        dispatch(fetchProducts({}));
    }
  }, [dispatch, products.length]);

  // Filter for products to show in the "Amazing Deals" section
  const dealProducts = useMemo(() => {
    return products
      .filter(p => p.discountPercentage > 15) // Find products with more than 15% discount
      .sort((a, b) => b.discountPercentage - a.discountPercentage); // Show best deals first
  }, [products]);

  // Products for the regular "Featured" section
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 bg-surface">
        <div className="container max-w-4xl mx-auto px-5">
          <h1 className="text-5xl font-bold text-text mb-4">Style Meets Function.</h1>
          <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">
            Discover our new collection of urban techwear. Engineered for the modern world.
          </p>
          <Link to="/shop" className="mt-8 inline-block bg-accent text-bg font-bold uppercase tracking-wider py-3 px-8 rounded-lg transition-opacity hover:bg-opacity-80">
            Explore The Collection
          </Link>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-5">
        {/* Amazing Deals Section */}
        {dealProducts.length > 0 && <DealsSection products={dealProducts} />}

        {/* Featured Products Section */}
        <section className="py-16">
          {/* --- STYLED WRAPPER --- */}
          {/* This new div wraps the content in a styled panel */}
          <div className="bg-surface rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
            {status === 'loading' && featuredProducts.length === 0 ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          {/* --- END OF STYLED WRAPPER --- */}
        </section>
      </div>
    </div>
  );
};

export default HomePage;