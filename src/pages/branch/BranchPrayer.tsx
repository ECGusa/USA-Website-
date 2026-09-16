import React from 'react';
import { Heart, Users } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import PrayerRequestForm from '../../components/branch/PrayerRequestForm';

interface BranchPrayerProps {
  data: BranchData;
}

const BranchPrayer: React.FC<BranchPrayerProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Prayer & Prophetic Request"
        description="Share your prayer request with our team. Whatever you're facing, you don't have to face it alone."
        path={`${basePath}/prayer`}
      />

      <PageBanner
        title="We're Here to Pray With You"
        subtitle="Whatever you're facing, you don't have to face it alone. Share your prayer request with our team."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Prayer' },
        ]}
      />

      {/* Calming intro section */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto text-rose-500 mb-6" size={56} />
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
            You Are Not Alone
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Prayer is the lifeline of our relationship with God. It's how we communicate with Him, share our
            hearts, and find strength for the journey. Whatever you are going through — whether it's a season
            of joy or a time of difficulty — we want to stand with you in prayer.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our pastoral team receives every prayer request and faithfully brings each one before God.
            Your request is kept confidential and handled with care.
          </p>
        </div>
      </section>

      {/* Prayer request form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <PrayerRequestForm branchId={branch.id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl p-8">
                <Heart className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-3">Prayer Changes Things</h3>
                <p className="text-blue-100 leading-relaxed text-sm">
                  "Therefore I tell you, whatever you ask for in prayer, believe that you have received it,
                  and it will be yours." — Mark 11:24
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <Users className="text-blue-700 mb-4" size={32} />
                <h3 className="text-lg font-bold text-blue-900 mb-3">Prayer Times</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join us for our weekly prayer services as we seek God together as a community.
                </p>
                <a
                  href={`${basePath}/events`}
                  className="text-blue-700 hover:text-blue-900 font-semibold text-sm flex items-center transition-colors"
                >
                  View Prayer Schedule
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchPrayer;
