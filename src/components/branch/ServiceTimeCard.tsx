import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { ServiceTime } from '../../lib/supabase';

interface ServiceTimeCardProps {
  service: ServiceTime;
  index?: number;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const ServiceTimeCard: React.FC<ServiceTimeCardProps> = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-yellow-400"
    >
      <h3 className="text-xl font-bold text-blue-900 mb-3">{service.service_name}</h3>
      <div className="space-y-2">
        {!isPlaceholder(service.day) && (
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-yellow-500" />
            <span className="font-semibold">{service.day}</span>
            {!isPlaceholder(service.start_time) && (
              <span className="ml-2">{service.start_time}{service.end_time ? ` – ${service.end_time}` : ''}</span>
            )}
          </div>
        )}
        {!isPlaceholder(service.location) && (
          <div className="flex items-start text-gray-600">
            <MapPin size={18} className="mr-2 mt-0.5 text-yellow-500" />
            <span className="text-sm">{service.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceTimeCard;
