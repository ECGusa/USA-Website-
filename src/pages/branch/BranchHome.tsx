import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Heart, Users, Quote, Clock, Calendar,
} from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import BranchHero from '../../components/branch/BranchHero';
import QuickActions from '../../components/branch/QuickActions';
import MinistryCard from '../../components/branch/MinistryCard';
import EventCard from '../../components/branch/EventCard';
import SermonCard, { getYouTubeId } from '../../components/branch/SermonCard';
import TestimonyCard from '../../components/branch/TestimonyCard';
import LocationMap from '../../components/branch/LocationMap';
import { Sermon } from '../../lib/supabase';

interface BranchHomeProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchHome: React.FC<BranchHomeProps> = ({ data }) => {
  const { branch, serviceTimes, leaders, ministries, events, sermons, testimonies } = data;
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  const basePath = '/maine';
  const pastor = leaders.find((l) => l.title?.toLowerCase().includes('resident pastor')) || leaders[0];
  const upcomingEvents = events
    .filter((e) => e.start_datetime && new Date(e.start_datetime) >= new Date(new Date().toDateString()))
    .slice(0, 3);
  const latestSermons = sermons.slice(0, 3);
  const activeSermonForVideo = activeSermon || latestSermons[0];
  const ytId = activeSermonForVideo?.video_url && !isPlaceholder(activeSermonForVideo.video_url)
    ? getYouTubeId(activeSermonForVideo.video_url)
    : null;

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="ECG The Jesus Nation Church — Maine Branch"
        description={`Welcome to ECG The Jesus Nation Church Maine Branch. Join us for worship, prayer, fellowship, teaching, and community${!isPlaceholder(branch.city) ? ` in ${branch.city}, Maine` : ''}.`}
      />

      {/* 1. Header (rendered by parent layout) */}

      {/* 3. Hero */}
      <BranchHero branch={branch} serviceTimes={serviceTimes} />

      {/* 4. Quick Actions */}
      <QuickActions />

      {/* 6. Welcome from Resident Pastor */}
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
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {pastor.biography && !pastor.biography.startsWith('[')
                    ? pastor.biography
                    : 'We are so glad you are here. At ECG The Jesus Nation Church Maine Branch, we believe God has a purpose and a plan for your life. Whether you are searching for a church home, looking to grow in your faith, or simply curious about who we are, we welcome you with open arms. Come as you are — you belong here.'}
                </p>
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

      {/* 7. About the Maine Branch */}
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

      {/* 8. Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600 text-lg">Join us at our next gathering.</p>
            </div>
            <Link
              to={`${basePath}/events`}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center transition-colors mt-2 sm:mt-0"
            >
              View All Events
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No upcoming events scheduled at this time.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon or follow us on social media for updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* 9. Ministries */}
      <section className="py-20 bg-white">
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

      {/* 10. Cell Groups */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cell Groups</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Church becomes family when we do life together. Find a community near you.
            </p>
          </div>

          <div className="text-center">
            <Link
              to={`${basePath}/cell-groups`}
              className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              Find a Cell Group
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Latest Sermon */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Watch & Listen</h2>
              <p className="text-gray-600 text-lg">Latest messages and sermons.</p>
            </div>
            <Link
              to={`${basePath}/watch`}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center transition-colors mt-2 sm:mt-0"
            >
              View All
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          {latestSermons.length > 0 ? (
            <>
              {/* Featured video player */}
              {ytId && (
                <div className="mb-8 aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={activeSermonForVideo?.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestSermons.map((sermon, index) => (
                  <SermonCard
                    key={sermon.id}
                    sermon={sermon}
                    index={index}
                    onPlay={(s) => setActiveSermon(s)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <Play className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No sermons available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Sermons will appear here once they are published.</p>
            </div>
          )}
        </div>
      </section>

      {/* 12. Prayer CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto mb-6 text-yellow-400" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We're Here to Pray With You</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whatever you're facing, you don't have to face it alone. Share your prayer request with our team.
          </p>
          <Link
            to={`${basePath}/prayer`}
            className="inline-flex items-center bg-white hover:bg-gray-100 text-rose-700 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
          >
            Submit a Prayer Request
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* 13. Testimony Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Quote className="mx-auto text-yellow-400 mb-4" size={40} />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Testimonies</h2>
            <p className="text-gray-600 text-lg">See what God has done in the lives of our members.</p>
          </div>

          {testimonies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonies.slice(0, 3).map((testimony, index) => (
                <TestimonyCard key={testimony.id} testimony={testimony} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-lg">No testimonies published yet.</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to share what God has done!</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to={`${basePath}/testimonies`}
              className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Share Your Testimony
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 14. Give / Partnership */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
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

      {/* 15. Get Involved */}
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

      {/* 16. Location / Map */}
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

      {/* 17. Final Join Us CTA (in footer) */}
    </div>
  );
};

export default BranchHome;
