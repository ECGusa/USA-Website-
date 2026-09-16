import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, ArrowRight } from 'lucide-react';
import { CellGroup } from '../../lib/supabase';

interface CellGroupCardProps {
  group: CellGroup;
  index?: number;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const CellGroupCard: React.FC<CellGroupCardProps> = ({ group, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-blue-900 mb-3">{group.name}</h3>

      <div className="space-y-2 text-sm mb-5">
        {!isPlaceholder(group.city) && (
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-yellow-500" />
            {group.city}
          </div>
        )}
        {!isPlaceholder(group.meeting_day) && (
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-yellow-500" />
            {group.meeting_day} {group.meeting_time && `at ${group.meeting_time}`}
          </div>
        )}
        {!isPlaceholder(group.leader) && (
          <div className="flex items-center text-gray-600">
            <User size={16} className="mr-2 text-yellow-500" />
            {group.leader}
          </div>
        )}
      </div>

      <a
        href="/maine/cell-groups"
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold text-sm transition-colors"
      >
        Join This Group
        <ArrowRight size={16} className="ml-1" />
      </a>
    </motion.div>
  );
};

export default CellGroupCard;
