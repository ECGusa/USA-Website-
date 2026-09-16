import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Heart, ArrowRight, Users } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import VolunteerForm from '../../components/branch/VolunteerForm';

interface BranchGetInvolvedProps {
  data: BranchData;
}

const volunteerOpportunities = [
  { icon: Users, name: 'Worship', text: 'Use your musical gifts to lead the congregation into God\'s presence.' },
  { icon: Users, name: 'Media', text: 'Help with sound, video, streaming, and digital content.' },
  { icon: Users, name: 'Ushers', text: 'Welcome guests and ensure smooth service operations.' },
  { icon: Users, name: 'Children\'s Ministry', text: 'Nurture the next generation in their faith.' },
  { icon: Users, name: 'Youth', text: 'Mentor and disciple young people.' },
  { icon: Users, name: 'Prayer', text: 'Join the intercession team and pray for the church and community.' },
  { icon: Users, name: 'Outreach', text: 'Serve the community through practical acts of love.' },
  { icon: Users, name: 'Events', text: 'Help plan and execute church events and special services.' },
  { icon: Users, name: 'Administration', text: 'Support the church office with administrative tasks.' },
];

const BranchGetInvolved: React.FC<BranchGetInvolvedProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Get Involved"
        description="Find your place at ECG The Jesus Nation Church Maine Branch. Become a member, volunteer, and serve."
        path={`${basePath}/get-involved`}
      />

      <PageBanner
        title="Find Your Place"
        subtitle="There's a place for everyone at ECG Maine. Discover how you can belong, grow, and serve."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Get Involved' },
        ]}
      />

      {/* Become a Member */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center mb-5">
                <UserPlus className="text-yellow-400" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Become a Member</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Becoming a member is about more than just attending services — it's about committing to a family.
                We'd love to walk alongside you as you take this next step in your faith journey.
              </p>
              <div className="space-y-3">
                {[
                  'Attend services regularly',
                  'Join a cell group near you',
                  'Participate in a new members class',
                  'Get baptized (if you haven\'t already)',
                  'Find a place to serve',
                ].map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-7 h-7 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
              <a
                href={`${basePath}/contact`}
                className="inline-flex items-center mt-8 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us About Membership
                <ArrowRight size={18} className="ml-2" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-100"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">What Membership Means</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Membership at ECG Maine is a commitment to grow spiritually, serve faithfully, and support
                the vision of the church. As a member, you'll have opportunities to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><Heart size={18} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" /> Grow in your relationship with God</li>
                <li className="flex items-start"><Heart size={18} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" /> Build meaningful relationships</li>
                <li className="flex items-start"><Heart size={18} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" /> Discover and use your gifts</li>
                <li className="flex items-start"><Heart size={18} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" /> Make a difference in Maine</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-gray-600 text-lg">Use your gifts and passions to serve the church and community.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {volunteerOpportunities.map((opp, i) => (
              <motion.div
                key={opp.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <opp.icon className="text-blue-900" size={24} />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{opp.name}</h3>
                <p className="text-gray-600 text-sm">{opp.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Volunteer Application</h2>
            <p className="text-gray-600 text-lg">Ready to serve? Tell us about yourself and how you'd like to get involved.</p>
          </div>
          <VolunteerForm branchId={branch.id} />
        </div>
      </section>
    </div>
  );
};

export default BranchGetInvolved;
