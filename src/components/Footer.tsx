import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

interface FooterProps {
  hideContact?: boolean;
}

const Footer = ({ hideContact = false }: FooterProps) => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        {!hideContact && (
        <section id="contact" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We'd love to hear from you and help you take your next step in faith
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-blue-900">
              <p className="text-lg font-semibold mb-4">Ready to connect with us?</p>
              <a
                href="/visit-us"
                className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Visit Us
              </a>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Visit Us</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-yellow-400 mr-3 mt-1" size={20} />
                    <div>
                      <p className="text-blue-100">4610 69th Avenue</p>
                      <p className="text-blue-100">Hyattsville</p>
                      <p className="text-blue-100">MD 20784, USA</p>

                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="text-yellow-400 mr-3" size={20} />
                    <div className="text-blue-100">
                      <p>+1 508-361-4307</p>
                      <p>+1 202-253-5971</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="text-yellow-400 mr-3" size={20} />
                    <div className="text-blue-100">
                      <p>info@ecg-usa.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Service Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Sunday Service in DC Metro Area</span>
                    <span className="text-white font-semibold">1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Mid-Week Service</span>
                    <span className="text-white font-semibold">Thursday 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Home Cell Prayer Meetings</span>
                    <span className="text-white font-semibold">Contact National Office</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Church Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/ecg-logo.png" 
                  alt="ECG USA Logo" 
                  className="h-12 w-auto mr-4"
                />
              </div>
              
              <p className="text-blue-100 leading-relaxed mb-6 max-w-md">
                Raising a people passionate about spiritual and socioeconomic transformation 
                through the Gospel of Jesus Christ under the prophetic grace and anointing.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/ecgusanational/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/ecgusanational/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@ecgusa-washingtondc100/streams" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/visit-us" className="text-blue-100 hover:text-yellow-400 transition-colors">Visit Us</a></li>
                <li><a href="#presidents-message" className="text-blue-100 hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#ministries" className="text-blue-100 hover:text-yellow-400 transition-colors">Ministries</a></li>
                <li><a href="#events" className="text-blue-100 hover:text-yellow-400 transition-colors">Events</a></li>
                <li><a href="#leadership" className="text-blue-100 hover:text-yellow-400 transition-colors">Leadership</a></li>
                <li><a href="#give" className="text-blue-100 hover:text-yellow-400 transition-colors">Give</a></li>
                <li><a href="#" className="text-blue-100 hover:text-yellow-400 transition-colors">Watch Online</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-yellow-400 mr-3 mt-1" size={20} />
                  <div>
                    <p className="text-blue-100">4610 69th Avenue</p>
                    <p className="text-blue-100">Hyattsville, MD 20784</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-yellow-400 mr-3" size={20} />
                  <p className="text-blue-100">+1 508-361-4307</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-yellow-400 mr-3" size={20} />
                  <p className="text-blue-100">info@ecg-usa.org</p>
                </div>
              </div>

              {/* Service Times */}
              <div className="mt-6">
                <h5 className="font-bold text-yellow-400 mb-3">Washington DC Metro-Area Service Times</h5>
                <div className="text-blue-100 space-y-1">
                  <p>Sunday: 1:00 PM</p>
                  <p>Thursday: 7:00 PM</p>
                  <p>Home Cell Bible Study: Contact National Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-blue-800 py-8">
          <NewsletterSignup />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              © 2026 ECG TJNC USA Church. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;