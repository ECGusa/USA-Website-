import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Music, Mic, HandHeart, Users, Baby, ArrowRight } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import ServiceTimeCard from '../../components/branch/ServiceTimeCard';
import LocationMap from '../../components/branch/LocationMap';

interface BranchVisitProps {
  data: BranchData;
}

const whatToExpect = [
  { icon: Smile, title: 'Friendly Welcome', text: 'From the moment you arrive, our team is ready to welcome you and answer any questions.' },
  { icon: Music, title: 'Worship', text: 'Experience passionate, Spirit-filled worship that ushers you into the presence of God.' },
  { icon: Mic, title: 'Powerful Preaching', text: 'Receive relevant, Bible-based teaching that will challenge and encourage you.' },
  { icon: HandHeart, title: 'Prayer', text: 'We believe in the power of prayer and offer opportunities for prayer at every service.' },
  { icon: Users, title: 'Fellowship', text: 'Connect with a community of believers who will support and encourage you.' },
  { icon: Baby, title: 'Kids & Family', text: 'Your children will love our safe, fun, and engaging children\'s ministry.' },
];

const BranchVisit: React.FC<BranchVisitProps> = ({ data }) => {
  const { branch, serviceTimes } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Plan Your Visit"
        description="Plan your visit to ECG The Jesus Nation Church Maine Branch. Service times, location, what to expect, and more."
        path={`${basePath}/visit`}
      />

      <PageBanner
        title="Plan Your Visit"
        subtitle="Whether you're visiting church for the first time or looking for a church family in Maine, we're excited to welcome you."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Plan Your Visit' },
        ]}
      />

      {/* Service Times */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Service Times</h2>
            <p className="text-gray-600 text-lg">Join us throughout the week for worship, prayer, and fellowship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceTimes.map((st, index) => (
              <ServiceTimeCard key={st.id} service={st} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Location</h2>
            <p className="text-gray-600 text-lg">Find us and get directions.</p>
          </div>
          <LocationMap branch={branch} className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What to Expect</h2>
            <p className="text-gray-600 text-lg">Here's what your visit will look like.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatToExpect.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-yellow-400" size={28} />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kids & Family */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Baby className="mx-auto text-cyan-600 mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Kids & Family</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We believe children are a gift from God. Our children's ministry provides a safe, fun, and engaging
            environment where kids can learn about Jesus at their own level. From nursery to pre-teens, your
            children will be well cared for and spiritually nurtured.
          </p>
          <Link
            to={`${basePath}/ministries`}
            className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Learn About Children's Ministry
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BranchVisit;
