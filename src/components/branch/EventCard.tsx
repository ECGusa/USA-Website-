import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Share2, Ticket } from 'lucide-react';
import { ChurchEvent } from '../../lib/supabase';

interface EventCardProps {
  event: ChurchEvent;
  index?: number;
}

const categoryColors: Record<string, string> = {
  'Sunday Services': 'from-blue-600 to-blue-800',
  'Midweek Services': 'from-indigo-600 to-indigo-800',
  'Prayer': 'from-rose-500 to-rose-700',
  'Youth': 'from-purple-500 to-purple-700',
  'Children': 'from-cyan-500 to-cyan-700',
  'Women': 'from-pink-500 to-pink-700',
  'Men': 'from-slate-600 to-slate-800',
  'Outreach': 'from-emerald-500 to-emerald-700',
  'Conferences': 'from-amber-500 to-amber-700',
  'Special Events': 'from-yellow-500 to-orange-600',
};

function formatEventDate(dateStr: string | null): { day: string; month: string; time: string } {
  if (!dateStr) return { day: '--', month: '---', time: '' };
  const date = new Date(dateStr);
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  const { day, month, time } = formatEventDate(event.start_datetime);
  const categoryColor = categoryColors[event.category || ''] || 'from-blue-600 to-blue-800';

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({ title: event.title, text: event.description || '', url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
    >
      {/* Image / Date badge */}
      <div className={`h-48 bg-gradient-to-br ${categoryColor} relative overflow-hidden`}>
        {event.image && !event.image.startsWith('[') ? (
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        ) : null}
        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center min-w-[60px] z-10">
          <div className="text-yellow-600 font-bold text-xs">{month}</div>
          <div className="text-blue-900 font-bold text-2xl leading-none">{day}</div>
        </div>
        {/* Category badge */}
        {event.category && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {event.category}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">{event.title}</h3>
        {event.description && !event.description.startsWith('[') && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>
        )}

        {/* Meta */}
        <div className="space-y-1.5 text-sm mb-4">
          {time && (
            <div className="flex items-center text-gray-500">
              <Clock size={14} className="mr-2" />
              {time}
            </div>
          )}
          {event.location && !event.location.startsWith('[') && (
            <div className="flex items-center text-gray-500">
              <MapPin size={14} className="mr-2" />
              {event.location}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {event.registration_url && !event.registration_url.startsWith('[') ? (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center"
            >
              <Ticket size={16} className="mr-1.5" />
              Register
            </a>
          ) : (
            <a
              href="/maine/visit"
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center"
            >
              <Calendar size={16} className="mr-1.5" />
              Learn More
            </a>
          )}
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Share event"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
