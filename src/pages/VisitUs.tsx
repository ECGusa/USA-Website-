import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ModernHeader from '../components/ModernHeader';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import SEOHead from '../components/SEOHead';

const VisitUs = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50">
        <SEOHead
          title="Visit Us | ECG TJNC USA Church"
          description="Plan your visit to Enlightened Christian Gathering — we'd love to see you."
          url="https://ecg-usa.org/visit-us"
        />
        <ModernHeader />

        {/* Hero Banner */}
        <div className="relative bg-blue-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/IMG_2519-slider3.jpg')" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-6">
                Welcome
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Visit Us
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                We'd love to have you join us. Fill out the form and we'll be in touch.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Typeform Embed — Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px]"
            >
              <div data-tf-live="01KKFDFTE3FTJC5WYYJF6YPY8K" style={{ width: '100%', height: '600px' }} />
            </motion.div>

            {/* Info Cards — Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Location */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="text-blue-900" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Our Location</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  4610 69th Avenue<br />
                  Hyattsville, MD 20784<br />
                  USA
                </p>
                <a
                  href="https://maps.google.com/?q=4610+69th+Avenue+Hyattsville+MD+20784"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold text-blue-900 hover:text-yellow-600 transition-colors underline underline-offset-2"
                >
                  Get Directions
                </a>
              </div>

              {/* Service Times */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="text-yellow-600" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Service Times</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Sunday Service (DC Metro Area)</span>
                    <span className="font-semibold text-blue-900">1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Mid-Week Service</span>
                    <span className="font-semibold text-blue-900">Thu 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Home Cell Prayer Meetings</span>
                    <span className="font-semibold text-blue-900 text-sm">Contact Office</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="text-green-700" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Get in Contact</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-3 text-gray-400 shrink-0" />
                    <div>
                      <p>+1 508-361-4307</p>
                      <p>+1 202-253-5971</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-3 text-gray-400 shrink-0" />
                    <a href="mailto:info@ecg-usa.org" className="hover:text-blue-900 transition-colors">
                      info@ecg-usa.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  title="ECG USA Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.9!2d-76.9!3d38.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4610+69th+Ave%2C+Hyattsville%2C+MD+20784!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <Footer hideContact />
        <ScrollToTop />
      </div>
    </HelmetProvider>
  );
};

export default VisitUs;
