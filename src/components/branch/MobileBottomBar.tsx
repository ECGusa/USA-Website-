import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, HandHeart } from 'lucide-react';

const MobileBottomBar: React.FC = () => {
  const location = useLocation();
  const basePath = '/maine';

  const items = [
    { name: 'Home', href: basePath, icon: Home },
    { name: 'Ministries', href: `${basePath}/ministries`, icon: HandHeart },
    { name: 'Give', href: `${basePath}/give`, icon: DollarSign },
    { name: 'Visit', href: `${basePath}/visit`, icon: Calendar },
  ];

  const isActive = (href: string) => {
    if (href === basePath) return location.pathname === basePath;
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-blue-900 border-t border-blue-700 shadow-2xl">
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active ? 'text-yellow-400' : 'text-blue-100 hover:text-white'
              }`}
            >
              <item.icon size={20} className={active ? 'fill-yellow-400/20' : ''} />
              <span className="text-xs mt-0.5 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomBar;
