import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Branch } from '../../lib/supabase';

interface LocationMapProps {
  branch: Branch;
  className?: string;
}

const isPlaceholder = (val: string | null | undefined) => !val || val.startsWith('[');

const LocationMap: React.FC<LocationMapProps> = ({ branch, className = '' }) => {
  const address = branch.address && !isPlaceholder(branch.address) ? branch.address : '';
  const mapUrl = branch.map_url && !isPlaceholder(branch.map_url)
    ? branch.map_url
    : address
      ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
      : '';

  const directionsUrl = address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    : '';

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Map */}
      <div className="aspect-video bg-gray-100 relative">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Church Location Map"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto mb-3" />
              <p className="text-sm">Map will appear once the address is set in the admin dashboard.</p>
            </div>
          </div>
        )}
      </div>

      {/* Address + Directions */}
      <div className="p-6">
        <div className="flex items-start mb-4">
          <MapPin className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-blue-900 font-semibold">{branch.branch_name}</p>
            {address && <p className="text-gray-600 text-sm">{address}</p>}
            {branch.city && !isPlaceholder(branch.city) && (
              <p className="text-gray-600 text-sm">{branch.city}, {branch.state}</p>
            )}
          </div>
        </div>

        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2.5 px-6 rounded-lg transition-colors"
          >
            <Navigation size={18} className="mr-2" />
            Get Directions
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
