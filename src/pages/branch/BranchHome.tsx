import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Heart, Users, Clock,
} from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import BranchHero from '../../components/branch/BranchHero';
import QuickActions from '../../components/branch/QuickActions';
import MinistryCard from '../../components/branch/MinistryCard';
import LocationMap from '../../components/branch/LocationMap';

interface BranchHomeProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchHome: React.FC<BranchHomeProps> = ({ data }) => {
  const { branch, serviceTimes, leaders, ministries } = data;

  const basePath = '/maine';
  const pastor = leaders.find((l) => l.title?.toLowerCase().includes('resident pastor')) || leaders[0];

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="ECG The Jesus Nation Church — Maine Branch"
        description={`Welcome to ECG The Jesus Nation Church Maine Branch. Join us for worship, prayer, fellowship, teaching, and community${!isPlaceholder(branch.city) ? ` in ${branch.city}, Maine` : ''}.`}
      />

      {/* Hero */}
      <BranchHero branch={branch} serviceTimes={serviceTimes} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Welcome from Resident Pastor */}
      {pastor && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  Welcome from Your Pastor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                  A Word from {pastor.name}
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-6">
                  <p className="italic text-blue-900 font-medium">Dear friend,</p>
                  <p>
                    On behalf of our church family here in Maine, it is my joy to welcome you. Whether you've worshipped with us for years or you're simply curious and searching, I want you to know there is a place for you here — and you don't have to have it all together to belong.
                  </p>
                  <p>
                    At Enlightened Christian Gathering (ECG) The Jesus Nation Church (TJNC), we are raising a people passionate about both spiritual and socioeconomic transformation through the Gospel of Jesus Christ. As the Resident Pastor, my mission is to advance the strategic vision of our father in the Lord, Prophet Shepherd Bushiri, right here in Maine, USA by carrying the mandate of this house into every community we can reach, and raising sons and daughters who will do the same. Under the prophetic grace upon his ministry, lives are being healed, homes restored, and destinies awakened. I believe yours is next.
                  </p>
                  <p>
                    So come as you are. Bring your questions, your burdens, and your hopes. We come expecting God to meet us in worship, to speak through His Word, and to send us out changed — to bless our families, our workplaces, and our communities across Maine. Our doors and our hearts are open, and we would count it a privilege to walk with you.
                  </p>
                  <p className="font-medium text-blue-900">
                    I look forward to meeting you in person very soon.
                  </p>
                </div>
                <p className="text-blue-900 font-bold text-lg">
                  — {pastor.name}
                </p>
                <p className="text-gray-500 text-sm">{pastor.title}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
                  {pastor.photo && !pastor.photo.startsWith('[') ? (
                    <img src={pastor.photo} alt={pastor.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-white/40">
                      <div className="w-32 h-32 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <Users size={64} />
                      </div>
                      <p className="text-sm">Pastor photo to be added</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* About the Maine Branch */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">About the Maine Branch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {branch.description || 'A place to encounter God, build meaningful relationships, grow in faith, and experience the power of the Gospel.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Our Mission', text: 'Raising a people passionate about spiritual and socioeconomic transformation through the Gospel of Jesus Christ.' },
              { icon: Users, title: 'Our Community', text: 'A diverse family of believers committed to loving God, loving people, and making a difference in Maine.' },
              { icon: Play, title: 'Our Services', text: 'Join us for powerful worship, prayer, and the preaching of God\'s Word every week.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="text-yellow-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={`${basePath}/about`}
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold transition-colors"
            >
              Learn More About Us
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Ministries</h2>
              <p className="text-gray-600 text-lg">Find your place to serve and grow.</p>
            </div>
            <Link
              to={`${basePath}/ministries`}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center transition-colors mt-2 sm:mt-0"
            >
              View All Ministries
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.slice(0, 6).map((ministry, index) => (
              <MinistryCard key={ministry.id} ministry={ministry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Prayer CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto mb-6 text-yellow-400" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We're Here to Pray With You</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whatever you're facing, you don't have to face it alone. Share your prayer request with our team.
          </p>
          <Link
            to={`${basePath}/prayer`}
            className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
          >
            Submit a Prayer Request
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Give / Partnership */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Give & Partner With Us</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Your generosity helps support the ministry, outreach, missions, families, and the work of the Gospel.
          </p>
          <Link
            to={`${basePath}/give`}
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
          >
            Give Online
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Find Your Place</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Whether you're new to the faith or looking to serve, there's a place for you here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center"
            >
              <Users className="mx-auto text-blue-700 mb-4" size={40} />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Become a Member</h3>
              <p className="text-gray-600 mb-5">Take the next step in making ECG Maine your church home.</p>
              <Link to={`${basePath}/get-involved`} className="text-blue-700 hover:text-blue-900 font-bold flex items-center justify-center transition-colors">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 border border-yellow-100 text-center"
            >
              <Heart className="mx-auto text-yellow-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Volunteer</h3>
              <p className="text-gray-600 mb-5">Discover how you can use your gifts to serve the church and community.</p>
              <Link to={`${basePath}/get-involved`} className="text-blue-700 hover:text-blue-900 font-bold flex items-center justify-center transition-colors">
                Get Involved <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location / Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Visit Us</h2>
            <p className="text-gray-600 text-lg">We'd love to worship with you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {serviceTimes.map((st) => (
                <div key={st.id} className="bg-white rounded-xl shadow-md p-6 flex items-center">
                  <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">{st.service_name}</div>
                    <div className="text-gray-600 text-sm">{st.day} {st.start_time && `at ${st.start_time}`}</div>
                  </div>
                </div>
              ))}
            </div>

            <LocationMap branch={branch} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchHome;
