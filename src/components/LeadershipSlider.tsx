import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Crown, Heart, BookOpen, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LeadershipSlider = () => {
  const [hoveredLeader, setHoveredLeader] = useState<number | null>(null);

  const leaders = [
    {
      id: 1,
      name: 'Major Prophet Dr. Shepherd Bushiri',
      title: 'Founder and President',
      image: '/major-2.jpeg',
      bio: 'Major Prophet Dr. Shepherd Bushiri is the founder and senior prophet of ECG. Under his prophetic ministry, millions have been touched through supernatural demonstrations of God\'s power.',
      specialties: ['Prophetic Ministry', 'Global Impact & Visionary', 'Biblical Scholar'],
      icon: Crown,
      featured: true
    },
    {
      id: 2,
      name: 'Apostle Brian Ngambi & Pastor Priscilla Ngambi',
      title: 'National Pastor for USA',
      image: '/Apostle-Brian-Pastor-Priscila 2.jpg',
      bio: 'Apostle Brian and Pastor Priscilla provide visionary leadership, spiritual guidance, and strategic direction across all branches in USA, overseeing the church\'s theological mission while managing large-scale operations that impact hundreds of thousands of congregants and communities nationwide in the USA.',
      specialties: ['Leadership & Training', 'Church Growth & Strategy', 'Community Outreach'],
      icon: Heart,
      featured: false
    },
    {
      id: 3,
      name: 'Apostle Jerry Bonney',
      title: 'Associate National Pastor for USA',
      image: '/pastor-jerry 2.jpg',
      bio: 'Pastor Jerry serves as a key lieutenant to the National Pastors, providing collaborative leadership in ministry operations, strategic planning, and pastoral care while supporting the execution of the church\'s vision across multiple locations. He faithfully helps steward the complex organizational structure of the Jesus Nation Church in the USA and plays a significant role in reviewing and strengthening branches facing decline. Through prayerful assessment, pastoral guidance, and strategic support, he works to revive struggling locations and position them for renewed impact and growth in advancing the Kingdom',
      specialties: ['Church Planting & Growth', 'Pastoral Care', 'Leadership'],
      icon: BookOpen,
      featured: false
    },
    {
      id: 4,
      name: 'Apostle Allan Allen',
      title: 'Associate National Pastor for USA',
      image: '/Apostle-Allen 2.jpg',
      bio: 'Apostle Allan Allen serves as Associate National Pastor, carrying a divine mandate to provide visionary leadership and pastoral oversight across multiple church locations. With a heart burning for revival, he is devoted to seeing lives transformed through the power of the Gospel. His ministry inspires spiritual growth, drives evangelism, and ignites a passion for God’s presence that awakens both individuals and communities. Through a focus on church expansion, community outreach, and raising strong pastoral leaders, Apostle Allan is equipping the ECG USA network to impact generations and carry the fire of revival to the nations.',
      specialties: ['Church Planting & Growth', 'Pastoral Care', 'Spiritual Growth & Evangelism'],
      icon: Users,
      featured: false
    },
    {
      id: 5,
      name: 'Pastor John Luka',
      title: 'USA National Advisory Committee Chair',
      image: '/Pastor_Luka.jpg',
      bio: 'Pastor Luka provides high-level guidance on organizational direction, policy development, and operational excellence to ensure the church\'s mission, values, and growth objectives are effectively implemented across all branches and programs in USA.',
      specialties: ['Strategic Leadership', 'Community Outreach & Growth', 'Organizational Development'],
      icon: BookOpen,
      featured: false
    }
  ];

  return (
   <section id="leadership" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Leadership
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
            Major Prophet Dr. Shepherd Bushiri is the founder and senior prophet of the Enlightened 
            Christian Gathering (ECG) The Jesus Nation Church (TJNC). Under his prophetic ministry, millions have been touched
          </p>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Anointed servants called to demonstrate God's power and love
          </p>
        </motion.div>

        {/* Featured Leader */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={leaders[0].image}
                  alt={leaders[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="text-blue-900" size={32} />
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                {leaders[0].name}
              </h3>
              <p className="text-xl text-blue-100 mb-6">{leaders[0].title}</p>
              
              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                {leaders[0].bio}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leaders[0].specialties.map((specialty, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Crown className="text-blue-900" size={20} />
                    </div>
                    <p className="text-sm text-blue-100">{specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Team Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.leadership-prev',
              nextEl: '.leadership-next'
            }}
            pagination={{
              el: '.leadership-pagination',
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} leadership-bullet"></span>`;
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
            className="leadership-swiper"
          >
            {leaders.slice(1).map((leader, index) => (
              <SwiperSlide key={leader.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredLeader(leader.id)}
                  onMouseLeave={() => setHoveredLeader(null)}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform transition-all duration-500 group-hover:scale-105 group-hover:bg-white/20">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <leader.icon className="text-blue-900" size={20} />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                      {leader.name}
                    </h4>
                    <p className="text-blue-100 mb-4">{leader.title}</p>
                    
                    <div className={`transition-all duration-500 overflow-hidden ${
                      hoveredLeader === leader.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-blue-100 text-sm leading-relaxed mb-4">
                        {leader.bio}
                      </p>
                      <div className="space-y-2">
                        {leader.specialties.map((specialty, idx) => (
                          <div key={idx} className="text-xs text-blue-900 bg-yellow-400 rounded-full px-3 py-1 inline-block mr-2">
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="text-yellow-400 font-semibold flex items-center justify-center mx-auto">
                        <span className="mr-2">Learn More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="leadership-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300">
            <ChevronLeft size={24} />
          </button>
          <button className="leadership-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300">
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div className="leadership-pagination flex justify-center mt-8 space-x-2"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
         <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Meet Our Full Team
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .leadership-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .leadership-bullet.swiper-pagination-bullet-active {
          background: #fbbf24;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default LeadershipSlider;