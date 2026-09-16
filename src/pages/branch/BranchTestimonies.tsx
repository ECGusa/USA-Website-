import React from 'react';
import { Quote } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import TestimonyCard from '../../components/branch/TestimonyCard';
import TestimonyForm from '../../components/branch/TestimonyForm';

interface BranchTestimoniesProps {
  data: BranchData;
}

const BranchTestimonies: React.FC<BranchTestimoniesProps> = ({ data }) => {
  const { branch, testimonies } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Testimonies"
        description="Read testimonies of what God has done in the lives of our Maine Branch members. Share your own story."
        path={`${basePath}/testimonies`}
      />

      <PageBanner
        title="Testimony Wall"
        subtitle="See what God has done in the lives of our church family. To God be the glory!"
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Testimonies' },
        ]}
      />

      {/* Testimonies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Quote className="mx-auto text-yellow-400 mb-4" size={40} />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Stories of God's Goodness</h2>
            <p className="text-gray-600 text-lg">Every testimony is a reminder that God is still working.</p>
          </div>

          {testimonies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((testimony, index) => (
                <TestimonyCard key={testimony.id} testimony={testimony} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center">
              <Quote className="mx-auto text-gray-300 mb-4" size={56} />
              <p className="text-gray-500 text-lg">No testimonies published yet.</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to share what God has done in your life!</p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Testimony */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Share Your Testimony</h2>
            <p className="text-gray-600 text-lg">
              Your story can encourage someone else. Share what God has done in your life.
            </p>
          </div>

          <TestimonyForm branchId={branch.id} />

          <p className="text-center text-gray-400 text-sm mt-6">
            Submitted testimonies are reviewed by our team before being published on the testimony wall.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BranchTestimonies;
