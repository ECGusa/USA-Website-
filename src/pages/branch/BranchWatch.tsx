import React, { useState } from 'react';
import { Search, Radio } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import SermonCard, { getYouTubeId } from '../../components/branch/SermonCard';
import { Sermon } from '../../lib/supabase';

interface BranchWatchProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchWatch: React.FC<BranchWatchProps> = ({ data }) => {
  const { branch, sermons } = data;
  const basePath = '/maine';
  const [searchQuery, setSearchQuery] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState('');
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  const speakers = [...new Set(sermons.map((s) => s.speaker).filter((s) => s && !isPlaceholder(s)))];

  const filtered = sermons.filter((s) => {
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (speakerFilter && s.speaker !== speakerFilter) return false;
    return true;
  });

  const featured = activeSermon || sermons[0];
  const featuredYtId = featured?.video_url && !isPlaceholder(featured.video_url)
    ? getYouTubeId(featured.video_url)
    : null;

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Watch & Listen"
        description="Watch sermons, services, and messages from ECG The Jesus Nation Church Maine Branch."
        path={`${basePath}/watch`}
      />

      <PageBanner
        title="Watch & Listen"
        subtitle="Watch sermons, services, and messages from the Maine Branch."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Watch & Listen' },
        ]}
      />

      {/* Live Stream */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            LIVE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Stream</h2>
          <p className="text-blue-100 text-lg mb-8">
            We're not live right now. Check back during service times, or watch our latest message below.
          </p>
          {featured && featuredYtId && (
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${featuredYtId}`}
                title={featured.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </section>

      {/* Latest Messages */}
      {sermons.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Latest Messages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.slice(0, 3).map((sermon, index) => (
                <SermonCard key={sermon.id} sermon={sermon} index={index} onPlay={(s) => setActiveSermon(s)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sermon Archive */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Sermon Archive</h2>

          {/* Search/Filter */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Speaker</label>
                <select
                  value={speakerFilter}
                  onChange={(e) => setSpeakerFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All speakers</option>
                  {speakers.map((s) => <option key={s} value={s as string}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((sermon, index) => (
                <SermonCard key={sermon.id} sermon={sermon} index={index} onPlay={(s) => setActiveSermon(s)} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center">
              <Radio className="mx-auto text-gray-300 mb-4" size={56} />
              <p className="text-gray-500 text-lg">
                {sermons.length === 0 ? 'No sermons available yet.' : 'No sermons match your search.'}
              </p>
              <p className="text-gray-400 text-sm mt-2">Sermons will appear here once they are published.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BranchWatch;
