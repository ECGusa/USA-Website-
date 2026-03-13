import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const events = [
       {
      title: "Easter Celebrations",
      date: "April 1 - 5, 2026",
      time: "5:00 AM - 5:00 PM CAT",
      location: "Global Hybrid Event at US Branches",
      attendees: "100M+ Expected Worldwide",
      description: "Prepare for the Easter 2026."
    },
    {
      title: "USA Annual Leadership Summit",
      date: "May 1-3, 2026",
      time: "8:00 AM - 10:00 PM EST",
      location: "Washington, DC",
      attendees: "1000+ Expected",
      description: "A Year to Plan, Build and Multiply."
    },
    {
      title: "Global Tribe of Judah Summit",
      date: "March 28 2026",
      time: "TBD",
      location: "Malawi and Hybrid at US Branches ",
      attendees: "100M+ Expected Globally",
      description: "Praising and Worship to Usher in Kairos Time."
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