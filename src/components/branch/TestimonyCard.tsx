import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimony } from '../../lib/supabase';

interface TestimonyCardProps {
  testimony: Testimony;
  index?: number;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const categoryColors: Record<string, string> = {
  'Healing': 'bg-emerald-100 text-emerald-700',
  'Family': 'bg-blue-100 text-blue-700',
  'Finances': 'bg-amber-100 text-amber-700',
  'Career': 'bg-purple-100 text-purple-700',
  'Relationships': 'bg-rose-100 text-rose-700',
  'Spiritual Growth': 'bg-indigo-100 text-indigo-700',
  'Thanksgiving': 'bg-yellow-100 text-yellow-700',
  'Other': 'bg-gray-100 text-gray-700',
};

const TestimonyCard: React.FC<TestimonyCardProps> = ({ testimony, index = 0 }) => {
  const date = new Date(testimony.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const categoryColor = categoryColors[testimony.category || ''] || 'bg-gray-100 text-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100"
    >
      <Quote className="text-yellow-400 mb-4" size={32} />

      <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimony.testimony}"</p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <div className="font-bold text-blue-900">{testimony.name || 'Anonymous'}</div>
          <div className="text-gray-400 text-sm">{date}</div>
        </div>
        {testimony.category && !isPlaceholder(testimony.category) && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
            {testimony.category}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonyCard;
