import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { Ministry } from '../../lib/supabase';

interface MinistryCardProps {
  ministry: Ministry;
  index?: number;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
    >
      {/* Image / Gradient header */}
      <div className="h-32 bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
        {ministry.image && !ministry.image.startsWith('[') ? (
          <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/30 text-4xl font-bold tracking-wider">{ministry.name.charAt(0)}</div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{ministry.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {ministry.description}
        </p>

        {/* Quick info */}
        <div className="space-y-1.5 mb-4 text-sm">
          {ministry.leader && !ministry.leader.startsWith('[') && (
            <div className="flex items-center text-gray-500">
              <User size={14} className="mr-2" />
              {ministry.leader}
            </div>
          )}
          {ministry.meeting_day && !ministry.meeting_day.startsWith('[') && (
            <div className="flex items-center text-gray-500">
              <Calendar size={14} className="mr-2" />
              {ministry.meeting_day} {ministry.meeting_time}
            </div>
          )}
        </div>

        {/* Expandable detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-100 pt-4 mb-4"
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{ministry.description}</p>
              {ministry.contact && !ministry.contact.startsWith('[') && (
                <div className="flex items-center text-gray-500 text-sm">
                  <Phone size={14} className="mr-2" />
                  {ministry.contact}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-700 hover:text-blue-900 font-semibold text-sm flex items-center transition-colors"
          >
            {expanded ? 'Show Less' : 'Learn More'}
            <ChevronDown size={16} className={`ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          <a
            href="/maine/get-involved"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm flex items-center transition-colors"
          >
            Get Involved
            <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default MinistryCard;
