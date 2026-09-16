import React from 'react';
import { Users } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import MinistryCard from '../../components/branch/MinistryCard';

interface BranchMinistriesProps {
  data: BranchData;
}

const BranchMinistries: React.FC<BranchMinistriesProps> = ({ data }) => {
  const { branch, ministries } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Ministries & Departments"
        description="Explore the ministries and departments of ECG The Jesus Nation Church Maine Branch. Find your place to serve and grow."
        path={`${basePath}/ministries`}
      />

      <PageBanner
        title="Ministries & Departments"
        subtitle="Discover how you can serve, grow, and connect through our ministries."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Ministries' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ministries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry, index) => (
                <MinistryCard key={ministry.id} ministry={ministry} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center">
              <Users className="mx-auto text-gray-300 mb-4" size={56} />
              <p className="text-gray-500 text-lg">Ministry information will be added soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BranchMinistries;
