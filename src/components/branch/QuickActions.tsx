import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Play, Heart, DollarSign, Users, HandHeart } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    title: 'Plan Your Visit',
    description: 'Everything you need for your first visit.',
    icon: Calendar,
    href: '/maine/visit',
    color: 'from-blue-600 to-blue-700',
  },
  {
    title: 'Watch & Listen',
    description: 'Watch sermons, services, and messages.',
    icon: Play,
    href: '/maine/watch',
    color: 'from-amber-500 to-amber-600',
  },
  {
    title: 'Prayer Request',
    description: 'Let us stand with you in prayer.',
    icon: Heart,
    href: '/maine/prayer',
    color: 'from-rose-500 to-rose-600',
  },
  {
    title: 'Give',
    description: 'Support the work of the Gospel and our local ministry.',
    icon: DollarSign,
    href: '/maine/give',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Join a Cell Group',
    description: 'Find a community near you.',
    icon: Users,
    href: '/maine/cell-groups',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Get Involved',
    description: 'Discover how you can serve.',
    icon: HandHeart,
    href: '/maine/get-involved',
    color: 'from-cyan-500 to-cyan-600',
  },
];

const QuickActions: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Quick Actions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find what you're looking for, fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="text-white" size={26} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                {action.title}
              </h3>
              <p className="text-gray-600">{action.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
