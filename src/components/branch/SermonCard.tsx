import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, User } from 'lucide-react';
import { Sermon } from '../../lib/supabase';

interface SermonCardProps {
  sermon: Sermon;
  index?: number;
  onPlay?: (sermon: Sermon) => void;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  return match ? match[1] : null;
}

const SermonCard: React.FC<SermonCardProps> = ({ sermon, index = 0, onPlay }) => {
  const ytId = sermon.video_url && !isPlaceholder(sermon.video_url) ? getYouTubeId(sermon.video_url) : null;
  const thumbnail = sermon.thumbnail && !isPlaceholder(sermon.thumbnail)
    ? sermon.thumbnail
    : ytId
      ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
      : '';
  const publishedDate = sermon.published_at
    ? new Date(sermon.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
      onClick={() => onPlay?.(sermon)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-blue-800 to-blue-950 relative overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : null}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="text-blue-900 ml-1" size={28} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">{sermon.title}</h3>
        {sermon.speaker && !isPlaceholder(sermon.speaker) && (
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <User size={14} className="mr-1.5" />
            {sermon.speaker}
          </div>
        )}
        <div className="flex items-center text-gray-400 text-sm">
          <Clock size={14} className="mr-1.5" />
          {publishedDate}
        </div>
        {sermon.category && !isPlaceholder(sermon.category) && (
          <span className="inline-block mt-3 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {sermon.category}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default SermonCard;
export { getYouTubeId };
