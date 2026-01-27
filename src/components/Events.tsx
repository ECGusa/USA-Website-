import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const events = [
       {
      title: "14 Days of Prayers and Fasting",
      date: "February 1 - 14, 2026",
      time: "5:00 AM - 5:00 PM CAT",
      location: "Global Hybrid Event at US Branches",
      attendees: "100M+ Expected Worldwide",
      description: "Prepare for the Year 2026."
    },
    {
      title: "Major 1's Birthday Celebration",
      date: "February 20, 2026",
      time: "8:00 PM - 1:00 AM CAT",
      location: "Malawi and Hybrid at US Branches",
      attendees: "300M+ Expected Worldwide",
      description: "Celebrating and Honoring Our Prophet."
    },
    {
      title: "KFMI Birthday Retreat",
      date: "February 20 2026",
      time: "TBD",
      location: "Malawi and Hybrid at US Branches ",
      attendees: "2000+ Expected",
      description: "Honoring the Prophet and Preparing Support Charitable Events Around the World."
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss these powerful opportunities for spiritual growth and community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">{event.title}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Calendar className="text-yellow-400 mr-3" size={20} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-yellow-400 mr-3" size={20} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-yellow-400 mr-3" size={20} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-yellow-400 mr-3" size={20} />
                  <span>{event.attendees}</span>
                </div>
              </div>
              
              <p className="text-blue-100 mb-6 leading-relaxed">{event.description}</p>
              
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-colors w-full">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;