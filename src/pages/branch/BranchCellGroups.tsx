import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import CellGroupCard from '../../components/branch/CellGroupCard';
import CellGroupRequestForm from '../../components/branch/CellGroupRequestForm';

interface BranchCellGroupsProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchCellGroups: React.FC<BranchCellGroupsProps> = ({ data }) => {
  const { branch, cellGroups } = data;
  const basePath = '/maine';
  const [searchCity, setSearchCity] = useState('');
  const [searchDay, setSearchDay] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = cellGroups.filter((g) => {
    if (searchCity && !isPlaceholder(g.city) && !g.city?.toLowerCase().includes(searchCity.toLowerCase())) return false;
    if (searchDay && g.meeting_day !== searchDay) return false;
    return true;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Cell Groups & Fellowships"
        description="Find a cell group near you in Maine. Church becomes family when we do life together."
        path={`${basePath}/cell-groups`}
      />

      <PageBanner
        title="Find Your Community"
        subtitle="Church becomes family when we do life together. Find a cell group near you."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Cell Groups' },
        ]}
      />

      {/* Find a Cell Group */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">Find a Cell Group</h2>

          {/* Search/Filter */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Search by city..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Meeting Day</label>
                <select
                  value={searchDay}
                  onChange={(e) => setSearchDay(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any day</option>
                  {days.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setSearchCity(''); setSearchDay(''); }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((group, index) => (
                <CellGroupCard key={group.id} group={group} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">
                {cellGroups.length === 0
                  ? 'No cell groups listed yet.'
                  : 'No cell groups match your search. Try adjusting your filters.'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Interested in joining or starting a group? See below!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Start or Join a Group */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto text-yellow-400 mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Start or Join a Group</h2>
            <p className="text-gray-600 text-lg">
              Whether you want to find an existing group or start a new one, we'd love to help you get connected.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setShowForm(false)}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${!showForm ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 border border-gray-200'}`}
            >
              Join a Cell Group
            </button>
            <button
              onClick={() => setShowForm(true)}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${showForm ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 border border-gray-200'}`}
            >
              Start a Cell Group
            </button>
          </div>

          <CellGroupRequestForm branchId={branch.id} key={showForm ? 'start' : 'join'} />
        </div>
      </section>
    </div>
  );
};

export default BranchCellGroups;
