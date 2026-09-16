import React from 'react';
import { Users } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import LeadershipCard from '../../components/branch/LeadershipCard';

interface BranchLeadershipProps {
  data: BranchData;
}

const BranchLeadership: React.FC<BranchLeadershipProps> = ({ data }) => {
  const { branch, leaders } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Our Leadership"
        description="Meet the leadership team of ECG The Jesus Nation Church Maine Branch."
        path={`${basePath}/about/leadership`}
      />

      <PageBanner
        title="Meet Our Leadership"
        subtitle="The dedicated team serving the Maine Branch with passion and purpose."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'About', href: `${basePath}/about` },
          { label: 'Leadership' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {leaders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {leaders.map((leader, index) => (
                <LeadershipCard key={leader.id} leader={leader} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center">
              <Users className="mx-auto text-gray-300 mb-4" size={56} />
              <p className="text-gray-500 text-lg">Leadership information will be added soon.</p>
              <p className="text-gray-400 text-sm mt-2">Please check back for updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BranchLeadership;
