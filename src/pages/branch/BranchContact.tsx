import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';
import BranchContactForm from '../../components/branch/BranchContactForm';
import LocationMap from '../../components/branch/LocationMap';

interface BranchContactProps {
  data: BranchData;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const BranchContact: React.FC<BranchContactProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  const socials: { icon: React.ElementType; url: string | null; label: string }[] = [
    { icon: Facebook, url: branch.facebook, label: 'Facebook' },
    { icon: Instagram, url: branch.instagram, label: 'Instagram' },
    { icon: Youtube, url: branch.youtube, label: 'YouTube' },
  ];

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Contact Us"
        description={`Get in touch with ECG The Jesus Nation Church Maine Branch. Phone, email, address, and contact form.`}
        path={`${basePath}/contact`}
      />

      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions, prayer requests, or just to say hello."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'Contact' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-yellow-400" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Address</h3>
                    <p className="text-gray-600">{branch.branch_name}</p>
                    {!isPlaceholder(branch.address) && <p className="text-gray-600">{branch.address}</p>}
                    {!isPlaceholder(branch.city) && <p className="text-gray-600">{branch.city}, {branch.state}</p>}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-yellow-400" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Phone</h3>
                    {!isPlaceholder(branch.phone) ? (
                      <a href={`tel:${branch.phone}`} className="text-gray-600 hover:text-blue-900 transition-colors">{branch.phone}</a>
                    ) : (
                      <p className="text-gray-400">Phone number to be added</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-yellow-400" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Email</h3>
                    {!isPlaceholder(branch.email) ? (
                      <a href={`mailto:${branch.email}`} className="text-gray-600 hover:text-blue-900 transition-colors">{branch.email}</a>
                    ) : (
                      <p className="text-gray-400">Email address to be added</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socials.map((social) => {
                    if (isPlaceholder(social.url)) return (
                      <div key={social.label} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400" aria-label={social.label}>
                        <social.icon size={22} />
                      </div>
                    );
                    return (
                      <a
                        key={social.label}
                        href={social.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-blue-900 hover:bg-blue-800 rounded-lg flex items-center justify-center text-white hover:text-yellow-400 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              <LocationMap branch={branch} />
            </div>

            {/* Contact Form */}
            <div>
              <BranchContactForm branchId={branch.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchContact;
