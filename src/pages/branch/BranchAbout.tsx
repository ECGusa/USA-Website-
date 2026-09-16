import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Home } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';

interface BranchAboutProps {
  data: BranchData;
}

const timeline = [
  { year: '[BRANCH START DATE]', title: 'Maine Branch Established', text: 'ECG The Jesus Nation Church expands to Maine, bringing the Gospel to the community.' },
  { year: '[DATE]', title: 'First Major Service', text: 'The Maine Branch holds its first public service, welcoming the community to worship.' },
  { year: '[DATE]', title: 'Ministries Launched', text: 'Worship, Youth, Children, and Prayer ministries are established to serve the congregation.' },
  { year: '[DATE]', title: 'Cell Groups Established', text: 'Home cell groups are launched across Maine for deeper fellowship and community.' },
  { year: '[DATE]', title: 'Community Outreach Expanded', text: 'The branch expands its outreach programs, serving families and individuals in need across Maine.' },
];

const BranchAbout: React.FC<BranchAboutProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="About Us"
        description="Learn about the ECG The Jesus Nation Church Maine Branch — our story, our mission, and our vision for Maine."
        path={`${basePath}/about`}
      />

      <PageBanner
        title="About the Maine Branch"
        subtitle="A place to encounter God, build meaningful relationships, grow in faith, and experience the power of the Gospel."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'About' },
        ]}
      />

      {/* Our Local Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Local Story</h2>
            <p className="text-lg text-gray-600">
              The Maine Branch of ECG The Jesus Nation Church USA is part of a growing network of branches
              across the United States, dedicated to bringing the transformative power of the Gospel to local communities.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              As a branch of ECG The Jesus Nation Church USA, the Maine Branch was established to bring the
              prophetic grace and anointing of the ministry to the people of Maine. We are committed to raising
              a people passionate about spiritual and socioeconomic transformation through the Gospel of Jesus Christ.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our vision is to see lives transformed, families restored, and communities impacted by the love
              and power of God. Whether you are searching for a church home, looking to grow in your faith, or
              simply curious about who we are, we welcome you with open arms.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg">Key milestones in the life of our branch.</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-yellow-400 rounded-full ring-4 ring-white md:-translate-x-1/2 mt-6 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <span className="inline-block bg-yellow-400 text-blue-900 font-bold text-sm px-3 py-1 rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Timeline information will be updated by branch administrators.
          </p>
        </div>
      </section>

      {/* Vision for Maine */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Vision for Maine</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We believe God has called us to be a beacon of hope and transformation in Maine. Through worship,
            prayer, outreach, and community, we are committed to seeing the Gospel change lives, one person
            at a time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Home, title: 'Reach', text: 'Bringing the Gospel to every corner of Maine.' },
              { icon: Users, title: 'Connect', text: 'Building a vibrant community of believers.' },
              { icon: Heart, title: 'Transform', text: 'Seeing lives changed by the power of God.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-yellow-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to={`${basePath}/about/leadership`} className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Meet Our Leadership <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to={`${basePath}/about/beliefs`} className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-colors">
              What We Believe <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchAbout;
