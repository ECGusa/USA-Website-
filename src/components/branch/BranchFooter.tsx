import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Calendar } from 'lucide-react';
import { Branch, ServiceTime } from '../../lib/supabase';

interface BranchFooterProps {
  branch: Branch;
  serviceTimes: ServiceTime[];
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchFooter: React.FC<BranchFooterProps> = ({ branch, serviceTimes }) => {
  const basePath = '/maine';
  const year = new Date().getFullYear();

  const socials: { icon: React.ElementType; url: string | null; label: string }[] = [
    { icon: Facebook, url: branch.facebook, label: 'Facebook' },
    { icon: Instagram, url: branch.instagram, label: 'Instagram' },
    { icon: Youtube, url: branch.youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-blue-900 text-white">
      {/* Join Us CTA */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 border-t border-blue-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Join Us This Sunday</h3>
              <p className="text-blue-100 text-lg">
                {serviceTimes[0]
                  ? `${serviceTimes[0].day} ${serviceTimes[0].start_time ? `at ${serviceTimes[0].start_time}` : ''}`
                  : 'Service time to be announced'}
              </p>
              {!isPlaceholder(branch.address) && (
                <p className="text-blue-200 text-sm mt-1">
                  {branch.address}{!isPlaceholder(branch.city) ? `, ${branch.city}` : ''}{!isPlaceholder(branch.state) ? `, ${branch.state}` : ''}
                </p>
              )}
            </div>
            <Link
              to={`${basePath}/visit`}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors flex items-center shadow-lg"
            >
              <Calendar size={20} className="mr-2" />
              Plan Your Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ECG-USA */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-6">ECG-USA</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-blue-100 hover:text-yellow-400 transition-colors">About ECG-USA</a></li>
              <li><a href="/#mission" className="text-blue-100 hover:text-yellow-400 transition-colors">Doctrine</a></li>
              <li><a href="/#leadership" className="text-blue-100 hover:text-yellow-400 transition-colors">Leadership</a></li>
              <li><a href="/#locations" className="text-blue-100 hover:text-yellow-400 transition-colors">Locations</a></li>
              <li><a href="/" className="text-blue-100 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Maine Branch */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-6">Maine Branch</h4>
            <ul className="space-y-3">
              <li><Link to={`${basePath}/about`} className="text-blue-100 hover:text-yellow-400 transition-colors">About</Link></li>
              <li><Link to={`${basePath}/ministries`} className="text-blue-100 hover:text-yellow-400 transition-colors">Ministries</Link></li>
              <li><Link to={`${basePath}/give`} className="text-blue-100 hover:text-yellow-400 transition-colors">Give</Link></li>
              <li><Link to={`${basePath}/visit`} className="text-blue-100 hover:text-yellow-400 transition-colors">Visit</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-6">Connect</h4>
            <div className="space-y-4">
              <div className="flex space-x-3">
                {socials.map((social) => {
                  if (isPlaceholder(social.url)) return null;
                  return (
                    <a
                      key={social.label}
                      href={social.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  );
                })}
              </div>

              <div className="space-y-2 pt-2">
                {!isPlaceholder(branch.address) && (
                  <div className="flex items-start">
                    <MapPin className="text-yellow-400 mr-2 mt-0.5" size={18} />
                    <span className="text-blue-100 text-sm">
                      {branch.address}{!isPlaceholder(branch.city) ? `, ${branch.city}` : ''}{!isPlaceholder(branch.state) ? `, ${branch.state}` : ''}
                    </span>
                  </div>
                )}
                {!isPlaceholder(branch.phone) && (
                  <div className="flex items-center">
                    <Phone className="text-yellow-400 mr-2" size={18} />
                    <span className="text-blue-100 text-sm">{branch.phone}</span>
                  </div>
                )}
                {!isPlaceholder(branch.email) && (
                  <div className="flex items-center">
                    <Mail className="text-yellow-400 mr-2" size={18} />
                    <span className="text-blue-100 text-sm">{branch.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to={`${basePath}/give`} className="text-blue-100 hover:text-yellow-400 transition-colors">Give</Link></li>
              <li><Link to={`${basePath}/give`} className="text-blue-100 hover:text-yellow-400 transition-colors">Partnership</Link></li>
              <li><Link to={`${basePath}/get-involved`} className="text-blue-100 hover:text-yellow-400 transition-colors">Volunteer</Link></li>
              <li><Link to={`${basePath}/get-involved`} className="text-blue-100 hover:text-yellow-400 transition-colors">Become a Member</Link></li>
            </ul>

            <div className="mt-6 space-y-2">
              {serviceTimes.slice(0, 2).map((st) => (
                <div key={st.id} className="flex justify-between text-sm">
                  <span className="text-blue-100">{st.service_name}</span>
                  <span className="text-white font-semibold">{st.day} {st.start_time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-sm text-center md:text-left">
              &copy; {year} ECG The Jesus Nation Church USA &mdash; Maine Branch. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BranchFooter;
