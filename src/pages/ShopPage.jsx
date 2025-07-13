import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../app/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { items: allProducts, categories, status } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState('latest');

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {

    dispatch(fetchProducts({ category: selectedCategory, searchTerm: initialSearchTerm }));
  }, [dispatch, selectedCategory, initialSearchTerm]);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        setSearchParams({ q: searchTerm }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setSearchParams]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortOrder('latest');
  };

  const displayedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (priceRange.min) {
      filtered = filtered.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(p => p.price <= Number(priceRange.max));
    }

    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [allProducts, priceRange, sortOrder]);

  return (
    <div className="container max-w-7xl mx-auto px-5 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit bg-surface p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">Filters</h2>
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-semibold mb-2">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent" />
              <span>-</span>
              <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              <button onClick={() => setSelectedCategory('')} className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedCategory === '' ? 'bg-accent text-bg' : 'hover:bg-border'}`}>All Categories</button>
              {categories.map((cat) => (
                <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors capitalize ${selectedCategory === cat.slug ? 'bg-accent text-bg' : 'hover:bg-border'}`}>{cat.name}</button>
              ))}
            </div>
          </div>
          <button onClick={handleClearFilters} className="w-full py-2 border border-border text-text font-semibold uppercase text-sm rounded-lg transition-colors hover:bg-accent hover:text-bg hover:border-accent">Clear Filters</button>
        </aside>

        {/* Product Listing */}
        <main className="lg:col-span-3">
          <div className="bg-surface rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-border">
              <p className="text-muted text-sm mb-2 sm:mb-0">
                Showing {displayedProducts.length} products
              </p>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-bg border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="latest">Sort by Latest</option>
                <option value="price-asc">Sort by Price: Low to High</option>
                <option value="price-desc">Sort by Price: High to Low</option>
                <option value="rating-desc">Sort by Rating: High to Low</option>
              </select>
            </div>

            {status === 'loading' ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={{ ...product, originalPrice: product.price * (1 + product.discountPercentage / 100), tag: product.discountPercentage > 15 ? 'Sale' : null }} />
                  ))
                ) : (
                  <p className="text-center text-muted col-span-full py-20">No products match your criteria.</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;