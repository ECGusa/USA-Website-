import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'About', 
      href: '#about',
      dropdown: [
        { name: 'Our Story', href: '#presidents-message' },
        { name: 'Mission & Vision', href: '#mission' },
        { name: 'Leadership', href: '#leadership' },
        { name: 'Beliefs', href: '#mission' }
      ]
    },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Events', href: '#events' },
    { name: 'Give', href: 'https://www.eservicepayments.com/cgi-bin/vanco_ver3.vps?appver3=x1a8uAgje-8dTfwGAicT4jfYGSQ2YUK1meeOWlRPxdl1YzobNDOqExusiAiLTuMtBEhf8dxhk4vd5sYxhZbntY9OLO7Dg8yDfJe-osqoHKPelRMIUQO1ws0MDmjSxQn1qcPvZJD84MxDRx5JAFwT7g==' },
    {name:'Store', href:'https://propheticstore.com'},
    { name: 'Visit Us', href: '/visit-us' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
          >
            <img 
              src="/ecg-logo.png" 
              alt="ECG USA Logo" 
              className={`h-12 w-auto mr-3 transition-all duration-300 ${
                isScrolled ? 'drop-shadow-md' : ''
              }`}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`font-medium transition-all duration-300 flex items-center group ${
                    isScrolled 
                      ? 'text-white hover:text-yellow-400' 
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full`}></span>
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center shadow-lg"
              onClick={() => window.open('https://www.youtube.com/@ecgusa-washingtondc100/streams', '_blank')}
            >
              <Play size={16} className="mr-2" />
              Watch Live
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center"
              onClick={() => {
                const locationsSection = document.getElementById('locations');
                if (locationsSection) {
                  locationsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Calendar size={16} className="mr-2" />
              Plan Your Visit
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-white hover:text-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
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
              className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-md rounded-lg mt-2 shadow-xl"
            >
              <div className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-yellow-400 font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.dropdown && (
                      <div className="pl-8 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-300 hover:text-yellow-400 text-sm transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="px-4 pt-4 space-y-3 border-t border-gray-600">
                  <button 
                    onClick={() => window.open('https://www.youtube.com/@ecgusa-washingtondc100/streams', '_blank')}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Play size={16} className="mr-2" />
                    Watch Live
                  </button>
                  <button 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Calendar size={16} className="mr-2" />
                    Plan Your Visit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default ModernHeader;