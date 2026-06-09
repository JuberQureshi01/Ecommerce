import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-luxe py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">LUXE</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Premium multi-vendor fashion marketplace. Discover the latest trends from top brands and independent designers.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/category/men" className="text-sm text-gray-400 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/category/women" className="text-sm text-gray-400 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/category/kids" className="text-sm text-gray-400 hover:text-white transition-colors">Kids</Link></li>
              <li><Link to="/products?sort=newest" className="text-sm text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="text-sm text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/referral" className="text-sm text-gray-400 hover:text-white transition-colors">Refer & Earn</Link></li>
              <li><Link to="/vendor/register" className="text-sm text-gray-400 hover:text-white transition-colors">Become a Vendor</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-gray-500">&copy; {new Date().getFullYear()} Luxe Fashion. All rights reserved.</p>
          <div className="flex gap-2 sm:gap-6">
            <span className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">Instagram</span>
            <span className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">Twitter</span>
            <span className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
