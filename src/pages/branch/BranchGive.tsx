import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';

interface BranchGiveProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const givingCategories = [
  { name: 'Tithes', text: 'Faithful giving that supports the ongoing work of the ministry.' },
  { name: 'Offering', text: 'Generous gifts that help meet the needs of the church and community.' },
  { name: 'Missions', text: 'Supporting the spread of the Gospel to the nations.' },
  { name: 'Outreach', text: 'Extending God\'s love through practical community support.' },
  { name: 'Building/Facilities', text: 'Investing in a permanent home for our church family.' },
  { name: 'Children & Youth', text: 'Nurturing the next generation in their faith journey.' },
];

const BranchGive: React.FC<BranchGiveProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';
  const givingUrl = branch.giving_url && !isPlaceholder(branch.giving_url) ? branch.giving_url : null;

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Give & Partner With Us"
        description="Your generosity helps support the ministry, outreach, missions, families, and the work of the Gospel at ECG Maine Branch."
        path={`${basePath}/give`}
      />

      <PageBanner
        title="Give & Partner With Us"
        subtitle="Your generosity helps support the ministry, outreach, missions, families, and the work of the Gospel."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Give' },
        ]}
      />

      {/* Tithes & Offerings */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6">
            <DollarSign className="text-white" size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Tithes & Offerings</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Thank you for your generosity. Your giving enables us to continue sharing the Gospel, serving our
            community, and building God's kingdom here in Maine. Every gift, no matter the size, makes a difference.
          </p>

          {givingUrl ? (
            <a
              href={givingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Give Online
              <ExternalLink size={20} className="ml-2" />
            </a>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-amber-800 font-semibold mb-2">Online Giving Coming Soon</p>
              <p className="text-amber-700 text-sm">
                Our online giving platform is being configured. Please check back soon or contact us for giving options.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Giving Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Giving Categories</h2>
            <p className="text-gray-600 text-lg">Direct your gift to the area you're most passionate about.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {givingCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <h3 className="text-lg font-bold text-blue-900 mb-3">{cat.name}</h3>
                <p className="text-gray-600 text-sm">{cat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto text-yellow-400 mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Partner</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Partnership is more than giving — it's a commitment to standing with us in prayer, support, and
            sharing the Gospel. Partners help sustain the long-term vision of the Maine Branch and play a vital
            role in everything God is doing through this ministry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'Pray', text: 'Commit to praying for the ministry regularly.' },
              { title: 'Give', text: 'Support the work financially on a recurring basis.' },
              { title: 'Share', text: 'Help spread the Gospel by sharing our content and inviting others.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <a
            href={`${basePath}/contact`}
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
          >
            Contact Us About Partnership
            <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default BranchGive;
