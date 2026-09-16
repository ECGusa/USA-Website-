import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Branch, ServiceTime } from '../../lib/supabase';

interface BranchHeroProps {
  branch: Branch;
  serviceTimes: ServiceTime[];
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchHero: React.FC<BranchHeroProps> = ({ branch, serviceTimes }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        {branch.hero_image && !isPlaceholder(branch.hero_image) ? (
          <img
            src={branch.hero_image}
            alt={branch.branch_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">
          {/* Branch badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block bg-yellow-400 text-blue-900 px-5 py-2 rounded-full text-sm font-bold tracking-wide">
              ECG The Jesus Nation Church USA
            </span>
            <div className="mt-3 text-yellow-400 text-lg font-semibold">
              {branch.state || 'Maine'} Branch
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Welcome to ECG The Jesus Nation Church &mdash; Maine Branch
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
          >
            A place to encounter God, build meaningful relationships, grow in faith, and experience
            the power of the Gospel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a
              href="/maine/visit"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Plan Your Visit
            </a>
            <a
              href="/maine/watch"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center"
            >
              Watch Online
            </a>
            <a
              href="/maine/prayer"
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center"
            >
              Submit a Prayer Request
            </a>
          </motion.div>

          {/* Service time summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl"
          >
            <h3 className="text-yellow-400 font-bold text-lg mb-4 flex items-center">
              <Clock className="mr-2" size={20} />
              Join Us This Week
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceTimes.slice(0, 3).map((st) => (
                <div key={st.id} className="flex items-start">
                  <MapPin className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <div className="text-white font-semibold text-sm">{st.service_name}</div>
                    <div className="text-blue-100 text-sm">
                      {st.day} {st.start_time && `at ${st.start_time}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 xl:bottom-8 right-8 z-10 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default BranchHero;
