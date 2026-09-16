import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { Leader } from '../../lib/supabase';

interface LeadershipCardProps {
  leader: Leader;
  index?: number;
}

const placeholderPhoto = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTljM2FmIiBzdHJva2Utd2lkdGg9IjEuNSI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI0Ii8+PHBhdGggZD0iTTIwIDIxYzAtMy44NjYtMy41ODItNy04LTdzLTggMy4xMzQtOCA3Ii8+PC9zdmc+';

const LeadershipCard: React.FC<LeadershipCardProps> = ({ leader, index = 0 }) => {
  const photo = leader.photo && !leader.photo.startsWith('[') ? leader.photo : placeholderPhoto;
  const isPlaceholder = leader.name.startsWith('[');

  const socials = leader.social_links || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
    >
      {/* Photo */}
      <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 relative">
        {isPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800">
            <div className="text-center text-white/40">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21c0-3.866-3.582-7-8-7s-8 3.134-8 7" />
                </svg>
              </div>
              <p className="text-sm">Photo to be added</p>
            </div>
          </div>
        ) : (
          <img
            src={photo}
            alt={leader.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-1">{leader.name}</h3>
        <p className="text-yellow-600 font-semibold text-sm mb-3">{leader.title}</p>
        {leader.biography && !leader.biography.startsWith('[') && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{leader.biography}</p>
        )}

        {/* Contact */}
        <div className="space-y-1.5">
          {leader.email && !leader.email.startsWith('[') && (
            <a href={`mailto:${leader.email}`} className="flex items-center text-gray-500 hover:text-blue-900 text-sm transition-colors">
              <Mail size={14} className="mr-2" />
              {leader.email}
            </a>
          )}
          {leader.phone && !leader.phone.startsWith('[') && (
            <a href={`tel:${leader.phone}`} className="flex items-center text-gray-500 hover:text-blue-900 text-sm transition-colors">
              <Phone size={14} className="mr-2" />
              {leader.phone}
            </a>
          )}
        </div>

        {/* Social Links */}
        {Object.keys(socials).length > 0 && (
          <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
            )}
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram size={18} />
              </a>
            )}
            {socials.youtube && (
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                <Youtube size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LeadershipCard;
