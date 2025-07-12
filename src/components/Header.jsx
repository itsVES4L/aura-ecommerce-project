import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// Add "About" and "Contact" to the navigation links
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${searchQuery.trim()}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border">
            <div className="container max-w-7xl mx-auto px-5">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold tracking-wide text-text transition-colors hover:text-accent">AURA</Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link key={link.name} to={link.href} className={`font-medium relative group transition-colors ${isActive ? 'text-text' : 'text-muted hover:text-text'}`}>
                                    <span>{link.name}</span>
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="flex items-center space-x-6">
                        <form onSubmit={handleSearchSubmit} className={`relative ${isSearchOpen ? 'w-48' : 'w-6'} transition-all duration-300`}>
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full bg-bg border-b-2 border-border text-text placeholder-muted focus:outline-none focus:border-accent transition-all duration-300 ${isSearchOpen ? 'opacity-100 pl-1 pr-8' : 'opacity-0'}`} placeholder="Search..." />
                            <button type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-text"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                        <Link to="/cart" aria-label="Shopping Cart" className="relative text-muted transition-colors hover:text-text text-lg">
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {totalItemsInCart > 0 && (
                                <span className="absolute -top-2 -right-2.5 flex items-center justify-center w-5 h-5 bg-accent text-bg text-xs font-bold rounded-full">
                                    {totalItemsInCart}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-muted transition-colors hover:text-text text-xl" aria-label="Toggle menu">
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <nav className="flex flex-col space-y-4 px-5 pb-5 pt-2 border-t border-border">
                    {navLinks.map((link) => (
                        <Link key={link.href} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`font-medium ${location.pathname === link.href ? 'text-text' : 'text-muted hover:text-text'}`}>{link.name}</Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;