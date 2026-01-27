import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: 'video',
      background: '/IMG_2515-slider1.jpg',
      title: 'Welcome to ECG USA',
      subtitle: 'Experience the Prophetic Power of God',
      description: 'Join us as we raise a people passionate about spiritual transformation through the Gospel of Jesus Christ.',
      primaryCTA: {
        text: 'Plan Your Visit',
        icon: Calendar,
        action: () => console.log('Plan visit')
      },
      secondaryCTA: {
        text: 'Watch Live',
        icon: Play,
        action: () => console.log('Watch live')
      }
    },
    {
      id: 2,
      type: 'image',
      background: '/IMG_2513-slider2.jpg',
      title: 'Theme of the Year 2026: "The Year of Victory"',
      subtitle: 'God\'s Kairos Moment for Answering Prayers',
      description: 'Join us for powerful sermon series on preparing to receive in God\'s overflowing provision and abundance for this year.',
      primaryCTA: {
        text: 'Watch Online',
        icon: Play,
        action: () => console.log('Watch online')
      },
      secondaryCTA: {
        text: 'Learn More',
        icon: ArrowRight,
        action: () => console.log('Learn more')
      }
    },
    {
      id: 3,
      type: 'image',
      background: '/IMG_2519-slider3.jpg',
      title: 'Birthday Celebration of Our Prophet Major 1',
      subtitle: 'February 20th',
      description: 'Join us for this celebration to honor our Spiritual Father.',
      primaryCTA: {
        text: 'Register Now',
        icon: Users,
        action: () => console.log('Register')
      },
      secondaryCTA: {
        text: 'Learn More',
        icon: ArrowRight,
        action: () => console.log('Learn more')
      }
    },
    {
      id: 4,
      type: 'image',
      background: '/IMG_2519-slider4.jpg',
      title: 'Get Connected',
      subtitle: 'Find Your Place in Our Community',
      description: 'Discover ministries, home cells, and opportunities to grow in faith and fellowship.',
      primaryCTA: {
        text: 'Get Connected',
        icon: Users,
        action: () => document.querySelector('[class*="mobile-app"]')?.scrollIntoView({ behavior: 'smooth' })
      },
      secondaryCTA: {
        text: 'View Ministries',
        icon: ArrowRight,
        action: () => console.log('View ministries')
      }
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next'
        }}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} hero-bullet"></span>`;
          }
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={slide.background}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                      The Jesus Nation Church USA
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {slide.title}
                  </h1>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-semibold mb-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {slide.subtitle}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    <button
                      onClick={() => {
                        if (slide.id === 4) {
                          const mobileAppSection = document.querySelector('section:has(h2:contains("Take The Jesus Nation Church"))') || 
                                                  document.querySelector('[class*="mobile-app"]') ||
                                                  Array.from(document.querySelectorAll('section')).find(section => 
                                                    section.textContent?.includes('Take The Jesus Nation Church Experience With You')
                                                  );
                          if (mobileAppSection) {
                            mobileAppSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        } else {
                          const locationsSection = document.getElementById('locations');
                          if (locationsSection) {
                            locationsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                     className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                    >
                     <slide.primaryCTA.icon className="mr-2 group-hover:scale-110 transition-transform text-blue-900" size={20} />
                      {slide.primaryCTA.text}
                    </button>
                    <button
                      onClick={() => window.open('https://www.youtube.com/@ecgusa-washingtondc100/streams', '_blank')}
                      className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center group"
                    >
                      <slide.secondaryCTA.icon className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                      {slide.secondaryCTA.text}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="hero-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group">
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>
      <button className="hero-next absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group">
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .hero-bullet.swiper-pagination-bullet-active {
          background: #fbbf24;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;