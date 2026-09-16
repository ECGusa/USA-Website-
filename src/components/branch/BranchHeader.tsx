import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar, Heart, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Branch } from '../../lib/supabase';

interface BranchHeaderProps {
  branch: Branch;
}

const BranchHeader: React.FC<BranchHeaderProps> = ({ branch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const basePath = `/maine`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Home', href: basePath },
    {
      name: 'About',
      href: `${basePath}/about`,
      dropdown: [
        { name: 'Our Story', href: `${basePath}/about` },
        { name: 'Leadership', href: `${basePath}/about/leadership` },
        { name: 'What We Believe', href: `${basePath}/about/beliefs` },
      ],
    },
    { name: 'Plan Your Visit', href: `${basePath}/visit` },
    { name: 'Ministries', href: `${basePath}/ministries` },
    { name: 'Cell Groups', href: `${basePath}/cell-groups` },
    { name: 'Events', href: `${basePath}/events` },
    { name: 'Watch & Listen', href: `${basePath}/watch` },
    { name: 'Prayer', href: `${basePath}/prayer` },
    { name: 'Give', href: `${basePath}/give` },
    { name: 'Get Involved', href: `${basePath}/get-involved` },
    { name: 'Contact', href: `${basePath}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === basePath) return location.pathname === basePath;
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-blue-900/98 backdrop-blur-md shadow-lg' : 'bg-blue-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo + Branch Identity */}
          <Link to={basePath} className="flex items-center cursor-pointer group">
            <img
              src="/ecg-logo.png"
              alt="ECG USA Logo"
              className="h-10 sm:h-12 w-auto mr-3 transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-white text-sm font-semibold">ECG The Jesus Nation Church USA</div>
              <div className="text-yellow-400 text-base font-bold">{branch.state || 'Maine'} Branch</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-5">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`font-medium text-sm transition-all duration-300 flex items-center group ${
                    isActive(item.href) ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center space-x-3">
            <Link
              to={`${basePath}/visit`}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm shadow-lg"
            >
              <Calendar size={15} className="mr-1.5" />
              Plan Your Visit
            </Link>
            <Link
              to={`${basePath}/prayer`}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm border border-white/20"
            >
              <Heart size={15} className="mr-1.5" />
              Prayer Request
            </Link>
            <Link
              to={`${basePath}/give`}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm"
            >
              <DollarSign size={15} className="mr-1.5" />
              Give
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden overflow-hidden bg-blue-950/98 backdrop-blur-md rounded-lg mt-1 shadow-xl max-h-[80vh] overflow-y-auto"
            >
              <div className="py-4 space-y-1">
                {/* Branch identity */}
                <div className="px-4 pb-3 border-b border-white/10 mb-3">
                  <div className="text-yellow-400 font-bold">Maine Branch</div>
                  <div className="text-blue-100 text-sm">ECG The Jesus Nation Church USA</div>
                </div>

                {menuItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-2.5 font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-yellow-400 bg-white/5'
                          : 'text-white hover:bg-white/5 hover:text-yellow-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-8 space-y-0.5">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-blue-100 hover:text-yellow-400 text-sm transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="px-4 pt-3 mt-2 border-t border-white/10 space-y-2">
                  <Link
                    to={`${basePath}/visit`}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Calendar size={16} className="mr-2" />
                    Plan Your Visit
                  </Link>
                  <Link
                    to={`${basePath}/prayer`}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center border border-white/20"
                  >
                    <Heart size={16} className="mr-2" />
                    Prayer Request
                  </Link>
                  <Link
                    to={`${basePath}/give`}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <DollarSign size={16} className="mr-2" />
                    Give
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default BranchHeader;
