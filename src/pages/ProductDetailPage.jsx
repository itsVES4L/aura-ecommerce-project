import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../app/productsSlice';
import { addToCart } from '../app/cartSlice';
import { addToWishlist, removeFromWishlist } from '../app/authSlice'; // Import wishlist actions
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// Helper component for rendering star ratings
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;
  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => <FontAwesomeIcon key={`full-${i}`} icon={faStarSolid} />)}
      {[...Array(emptyStars)].map((_, i) => <FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} />)}
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Get all necessary state from Redux
  const { selectedProduct: product, status } = useSelector((state) => state.products);
  const { wishlist, isAuthenticated } = useSelector((state) => state.auth);

  // Local state for the page
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Check if the current product is in the wishlist
  const isWishlisted = useMemo(() => {
    return product ? wishlist.some((item) => item.id === product.id) : false;
  }, [product, wishlist]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      alert('Please log in to use the wishlist feature.');
      return;
    }
    if (product) {
      if (isWishlisted) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    }
  };

  if (status === 'loading' || !product) return <Loader />;
  if (status === 'failed') return <p className="text-center text-red-500">Failed to load product details.</p>;

  return (
    <div className="container max-w-6xl mx-auto px-5 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="border border-border p-2 mb-4 rounded-2xl">
            <img src={selectedImage} alt={product.title} className="w-full h-auto aspect-square object-contain" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <div key={index} className={`border-2 p-1 cursor-pointer transition-all rounded-lg ${selectedImage === img ? 'border-accent' : 'border-border hover:border-muted'}`} onClick={() => setSelectedImage(img)}>
                <img src={img} alt={`${product.title} view ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Link to={`/shop?category=${product.category}`} className="text-sm uppercase tracking-wider text-accent font-semibold hover:underline">{product.category}</Link>
          <h1 className="text-4xl font-bold text-text my-2">{product.title}</h1>
          <p className="text-muted mb-4">Brand: {product.brand}</p>
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-muted text-sm">({product.reviews.length} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-accent mb-4">${product.price.toFixed(2)}<span className="text-lg font-normal text-red-500 ml-3">({product.discountPercentage}% OFF)</span></p>
          <p className="text-muted leading-relaxed mb-6">{product.description}</p>
          <div className="text-sm space-y-2 mb-6">
            <p className={product.availabilityStatus === 'In Stock' ? 'text-green-400' : 'text-yellow-400'}><strong>Availability:</strong> {product.availabilityStatus} ({product.stock} left)</p>
            <p className="text-muted"><strong>SKU:</strong> {product.sku}</p>
          </div>
          
    
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => handleQuantityChange(-1)} className="px-4 py-3 text-lg hover:bg-surface rounded-l-lg">-</button>
              <input type="text" value={quantity} readOnly className="w-12 text-center bg-transparent py-3" />
              <button onClick={() => handleQuantityChange(1)} className="px-4 py-3 text-lg hover:bg-surface rounded-r-lg">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-grow bg-accent text-bg font-bold uppercase tracking-wider py-3.5 rounded-lg transition-opacity hover:bg-opacity-80">Add to Cart</button>
            
          
            <button
              onClick={handleWishlistToggle}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              className="border border-border rounded-lg p-3 text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <FontAwesomeIcon
                icon={isWishlisted ? faHeartSolid : faHeartRegular}
                className={`text-xl ${isWishlisted ? 'text-red-500' : ''}`}
              />
            </button>
          </div>
     

        </div>
      </div>
      <div className="mt-20">
        <div className="border-b border-border flex space-x-8">
          <button onClick={() => setActiveTab('description')} className={`py-2 text-lg font-semibold border-b-2 transition-colors ${activeTab === 'description' ? 'border-accent text-text' : 'border-transparent text-muted hover:text-text'}`}>Description</button>
          <button onClick={() => setActiveTab('specs')} className={`py-2 text-lg font-semibold border-b-2 transition-colors ${activeTab === 'specs' ? 'border-accent text-text' : 'border-transparent text-muted hover:text-text'}`}>Specifications</button>
          <button onClick={() => setActiveTab('reviews')} className={`py-2 text-lg font-semibold border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-accent text-text' : 'border-transparent text-muted hover:text-text'}`}>Reviews ({product.reviews.length})</button>
        </div>
        <div className="py-8">
          {activeTab === 'description' && <p className="text-muted leading-loose">{product.description}</p>}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-muted">
              <div className="flex justify-between border-b border-border py-2"><span className="font-semibold text-text">Weight:</span> {product.weight}g</div>
              <div className="flex justify-between border-b border-border py-2"><span className="font-semibold text-text">Warranty:</span> {product.warrantyInformation}</div>
              <div className="flex justify-between border-b border-border py-2"><span className="font-semibold text-text">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</div>
              <div className="flex justify-between border-b border-border py-2"><span className="font-semibold text-text">Shipping:</span> {product.shippingInformation}</div>
              <div className="flex justify-between border-b border-border py-2"><span className="font-semibold text-text">Return Policy:</span> {product.returnPolicy}</div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              {product.reviews.length > 0 ? (
                <div className="space-y-8">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b border-border pb-6">
                      <div className="flex items-center mb-2"><p className="font-bold text-text mr-4">{review.reviewerName}</p><StarRating rating={review.rating} /></div>
                      <p className="text-sm text-muted mb-3">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-muted">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-muted">No reviews yet for this product.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;