import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import EventCard from '../../components/branch/EventCard';

interface BranchEventsProps {
  data: BranchData;
}

const categories = [
  'All', 'Sunday Services', 'Midweek Services', 'Prayer', 'Youth',
  'Children', 'Women', 'Men', 'Outreach', 'Conferences', 'Special Events',
];

const BranchEvents: React.FC<BranchEventsProps> = ({ data }) => {
  const { branch, events } = data;
  const basePath = '/maine';
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState<'upcoming' | 'services'>('upcoming');

  const now = new Date();
  const upcoming = events.filter((e) => e.start_datetime && new Date(e.start_datetime) >= now);
  const services = events.filter((e) =>
    e.category === 'Sunday Services' || e.category === 'Midweek Services' || e.category === 'Prayer'
  );

  const source = view === 'upcoming' ? upcoming : services;
  const filtered = activeCategory === 'All' ? source : source.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Events & Calendar"
        description="Stay up to date with events, services, and special gatherings at ECG The Jesus Nation Church Maine Branch."
        path={`${basePath}/events`}
      />

      <PageBanner
        title="Events & Calendar"
        subtitle="Join us for services, special events, conferences, and community gatherings."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Events' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setView('upcoming')}
                className={`px-5 py-2.5 rounded-lg font-bold transition-colors ${view === 'upcoming' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setView('services')}
                className={`px-5 py-2.5 rounded-lg font-bold transition-colors ${view === 'services' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Church Services
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-yellow-400 text-blue-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center">
              <Calendar className="mx-auto text-gray-300 mb-4" size={56} />
              <p className="text-gray-500 text-lg">No events scheduled at this time.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon or follow us on social media for updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BranchEvents;
