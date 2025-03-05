
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Calendar, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'ホーム', path: '/' },
    { name: '民泊検索', path: '/rentals' },
    { name: '長期滞在', path: '/long-stay' },
    { name: 'ウォッチリスト', path: '/watchlist' },
    { name: 'システム紹介', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6',
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-2xl font-bold text-timedrop-blue">TimeDrop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-timedrop-blue',
                isActive(link.path) ? 'text-timedrop-blue' : 'text-timedrop-dark-gray'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-timedrop-gray">
            <Search size={20} className="text-timedrop-dark-gray" />
          </button>
          <button className="p-2 rounded-full hover:bg-timedrop-gray">
            <Calendar size={20} className="text-timedrop-dark-gray" />
          </button>
          <button className="p-2 rounded-full hover:bg-timedrop-gray">
            <User size={20} className="text-timedrop-dark-gray" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-timedrop-gray"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-timedrop-dark-gray" />
          ) : (
            <Menu size={24} className="text-timedrop-dark-gray" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 md:hidden animate-slide-down">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-timedrop-blue p-2',
                  isActive(link.path) ? 'text-timedrop-blue bg-timedrop-gray rounded-md' : 'text-timedrop-dark-gray'
                )}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 pt-4 border-t border-timedrop-gray">
              <button className="flex items-center space-x-2 p-2 text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                <Search size={18} />
                <span>検索</span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                <Calendar size={18} />
                <span>予約</span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                <User size={18} />
                <span>ログイン</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
