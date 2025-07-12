import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

// Data for footer links - easy to manage and update
const footerLinks = {
  shop: [
    { name: 'Apparel', href: '/shop?category=mens-shirts' },
    { name: 'Accessories', href: '/shop?category=sunglasses' },
    { name: 'New Arrivals', href: '/shop' },
    { name: 'Sale', href: '/shop' },
  ],
  help: [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Size Guide', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container max-w-6xl mx-auto px-5 py-16">
        {/* Top section with links and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Shop Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted hover:text-accent transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted hover:text-accent transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted hover:text-accent transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Stay Connected</h4>
            <p className="text-muted mb-4">Get exclusive deals and updates straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-bg border border-border px-3 py-2 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button type="submit" className="bg-accent text-bg px-4 py-2 font-bold transition-opacity hover:bg-opacity-80">
                  →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright and social icons */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-muted">© {new Date().getFullYear()} AURA. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" aria-label="Instagram" className="text-muted hover:text-accent transition-colors">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" aria-label="Twitter" className="text-muted hover:text-accent transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" aria-label="Facebook" className="text-muted hover:text-accent transition-colors">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;