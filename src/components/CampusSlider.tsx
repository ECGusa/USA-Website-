import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin, Clock, Phone, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CampusSlider = () => {
  const campuses = [
    {
      id: 1,
      name: 'Washington DC',
      location: 'DC Metro Area',
      address: '4610 69th Avenue, Hyattsville, MD 20784',
      phone: '+1 508-361-4307',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '1:00 PM' },
        { day: 'Thursday', time: '7:00 PM' },   
      ],
      features: ['Main Sanctuary', 'Youth Center', 'Prayer Room', 'Fellowship Hall'],
      isMain: true
    },
    {
      id: 2,
      name: 'New York',
      location: 'New York, New York',
      address: 'Address: 206 S Fulton Avenue, Mount Vernon, NY 10550',
      phone: '+1 914-920-8519, +1 516-415-5133, +1 914-343-8026',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '10:00 AM' },
        { day: 'Wednesday', time: '7:30 PM' }
      ],
      features: ['Modern Sanctuary', 'Children\'s Area', 'Community Center'],
      isMain: false
    },
    {
      id: 3,
      name: 'Maine',
      location: 'Maine',
      address: '1 Westbrook Common, Westbrook ME 04092',
      phone: '+1 207- 216-0219, +1 207- 245-4007',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '1:00 PM EST' },
        { day: 'Wednesday', time: '6:30 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 4,
      name: 'New York (Merrick Blvd Queens)',
      location: 'New York',
      address: '109-18 Merrick Blvd, Jamaica Queens, New York 11433',
      phone: '+1 718-880-2122',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 5,
      name: 'New Jersey',
      location: 'New Jersey',
      address: '84 Veronica Ave, Somerset, NJ 08873',
      phone: '+1 678-499-7759',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 6,
      name: 'Port Saint Lucie',
      location: 'Florida',
      address: '2044 NewPort Isles Blvd, Port Saint Lucie Florida',
      phone: ' ',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 7,
      name: 'Central Florida',
      location: 'Florida',
      address: '2300 S Orange Blossom, Orlando FL 32805',
      phone: ' +1 352-573-7757',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '12:30 PM EST' },
        { day: 'Tuesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 8,
      name: 'Boston',
      location: 'Massachusetts',
      address: '110 West Boylston Street, Worcester MA 01606',
      phone: '+1 508-963-2831',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
     {
      id: 9,
      name: 'Chicago',
      location: 'Illinois',
      address: 'University of Chicago (2nd Floor, Theater)5655 South University Ave, Chicago Illinois 60637',
      phone: '+1 773 548 3761',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 10,
      name: 'Kansas City',
      location: 'Missouri',
      address: '2111 North Kansas City, MO 64116',
      phone: '+1 816-499-9063, +1 816-927-9547',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    }, 
    {
      id: 11,
      name: 'Houston',
      location: 'Texas',
      address: '21603 Wine Palm Way Katy TX 77449',
      phone: '+1 713-502-3989',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 12,
      name: 'North Carolina',
      location: 'North Carolina',
      address: '4628 State, HWY 49 Harrisburg, NC 28075',
      phone: '+1 980-327-6355, +1 704-713-6644',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '11:00 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
    {
      id: 13,
      name: 'Miami',
      location: 'Florida',
      address: 'Suite 207 19553 NW 2nd Ave, Miami, FL 33169',
      phone: '+1 305-303-9381',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '10:30 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
        {
      id: 14,
      name: 'New York',
      location: 'New York',
      address: 'Address: 206 S Fulton Avenue, Mount Vernon, NY 10550',
      phone: ' +1 914-920-8519, +1 516-415-5133, +1 914-343-8026',
      image: 'https://images.pexels.com/photos/8468465/pexels-photo-8468465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      serviceTimes: [
        { day: 'Sunday', time: '10:30 AM EST' },
        { day: 'Wednesday', time: '7:00 PM EST' }
      ],
      features: ['Main Sanctuary', 'Community Center', 'Prayer Room', 'Youth Area'],
      isMain: false
    },
  ];

  return (
   <section id="locations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the TJNC USA branch near you, or join us online from anywhere
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.campus-prev',
              nextEl: '.campus-next'
            }}
            pagination={{
              el: '.campus-pagination',
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} campus-bullet"></span>`;
              }
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="campus-swiper"
          >
            {campuses.map((campus, index) => (
              <SwiperSlide key={campus.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                    campus.isMain ? 'ring-2 ring-yellow-400' : ''
                  }`}>
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={campus.image}
                        alt={campus.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {campus.isMain && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                            National Office
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {campus.name}
                        </h3>
                        <p className="text-gray-200 flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {campus.location}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Address & Contact */}
                      <div className="mb-6">
                        <div className="flex items-start mb-3">
                          <MapPin className="text-blue-900 mr-3 mt-1 flex-shrink-0" size={18} />
                          <p className="text-gray-700">{campus.address}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="text-blue-900 mr-3 flex-shrink-0" size={18} />
                          <p className="text-gray-700">{campus.phone}</p>
                        </div>
                      </div>

                      {/* Service Times */}
                      <div className="mb-6">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                          <Clock className="mr-2" size={18} />
                          Service Times
                        </h4>
                        <div className="space-y-2">
                          {campus.serviceTimes.map((service, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">{service.day}</span>
                              <span className="font-semibold text-blue-900">{service.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-bold text-blue-900 mb-3">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {campus.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <button 
                          onClick={() => {
                            if (campus.id === 13) {
                              window.open('https://jesusnationmiami.org/', '_blank');
                            }
                          }}
                          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center group"
                        >
                          <Calendar className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                          Visit This Branch
                        </button>
                        <button 
                          onClick={() => {
                            if (campus.id === 13) {
                              window.open('https://jesusnationmiami.org/', '_blank');
                            }
                          }}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-blue-900 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center group"
                        >
                          <span className="mr-2">Learn More</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="campus-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl text-blue-900 p-3 rounded-full transition-all duration-300">
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <button className="campus-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl text-blue-900 p-3 rounded-full transition-all duration-300">
            <ArrowRight size={20} />
          </button>

          {/* Pagination */}
          <div className="campus-pagination flex justify-center mt-8 space-x-2"></div>
        </div>

      </div>

      <style jsx>{`
        .campus-bullet {
          width: 12px;
          height: 12px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .campus-bullet.swiper-pagination-bullet-active {
          background: #fbbf24;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default CampusSlider;