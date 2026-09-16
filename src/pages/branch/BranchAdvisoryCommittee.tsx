import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Music,
  ShieldCheck,
  Eye,
  TrendingUp,
  Scale,
  HandHelping,
  HeartHandshake,
  ClipboardList,
  Church,
  Grape,
  Wheat,
  Crown,
  type LucideIcon,
} from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';

interface BranchAdvisoryCommitteeProps {
  data: BranchData;
}

interface TribeInfo {
  icon: LucideIcon;
  description: string;
  colors: string;
}

const tribeInfo: Record<string, TribeInfo> = {
  Levite: {
    icon: Church,
    description: 'Pastoral & Altar Services',
    colors: 'from-blue-600 to-blue-700',
  },
  Benjamin: {
    icon: HeartHandshake,
    description: 'Counselors for New Converts',
    colors: 'from-emerald-600 to-emerald-700',
  },
  Issachar: {
    icon: HandHelping,
    description: 'Intercessors',
    colors: 'from-amber-600 to-amber-700',
  },
  Joseph: {
    icon: Wheat,
    description: 'Provision & Stewardship',
    colors: 'from-sky-600 to-sky-700',
  },
  Gad: {
    icon: ShieldCheck,
    description: 'Protocols, Security & Ushers',
    colors: 'from-teal-600 to-teal-700',
  },
  Naphtali: {
    icon: Grape,
    description: 'Hospitality & Fellowship',
    colors: 'from-blue-700 to-blue-800',
  },
  Asher: {
    icon: Crown,
    description: 'Blessings & Welfare',
    colors: 'from-rose-600 to-rose-700',
  },
  Zebulun: {
    icon: TrendingUp,
    description: 'Trade & Business',
    colors: 'from-cyan-600 to-cyan-700',
  },
  Reuben: {
    icon: ClipboardList,
    description: 'Trustees & Administration',
    colors: 'from-orange-600 to-orange-700',
  },
  Judah: {
    icon: Music,
    description: 'Worship, Media & Instruments',
    colors: 'from-yellow-600 to-yellow-700',
  },
  Simeon: {
    icon: Eye,
    description: 'Watchmen & Prophetic Agents',
    colors: 'from-lime-600 to-lime-700',
  },
  Dan: {
    icon: Scale,
    description: 'Legal & Safety',
    colors: 'from-slate-600 to-slate-700',
  },
};

const committeeMembers = [
  { tribe: 'Levite', name: 'Pastor Isaac Ogut' },
  { tribe: 'Benjamin', name: 'Billy Ngabire' },
  { tribe: 'Issachar', name: 'Pastor Elieza Heimen' },
  { tribe: 'Joseph', name: 'Pastor John Luka' },
  { tribe: 'Gad', name: 'Sano Masua' },
  { tribe: 'Naphtali', name: 'Ushie Henderson' },
  { tribe: 'Asher', name: 'Levi Hellen Pickson' },
  { tribe: 'Zebulun', name: 'Peninah Yarish' },
  { tribe: 'Reuben', name: 'Joyce Luka' },
  { tribe: 'Judah', name: 'Caroline P Masua' },
  { tribe: 'Simeon', name: 'Zeinab Hageisafi' },
  { tribe: 'Dan', name: 'Sano Masua' },
];

const adminTeam = [
  { name: 'Sano Masua', role: 'Administrator & Secretary' },
  { name: 'Joyce Luka', role: 'Women on Fire' },
  { name: 'Zereda Rasua', role: 'Youth Magnet Coordinator' },
  { name: 'Naima Oryem', role: 'Prophetic Giants Lead' },
  { name: 'Peninah Yarish', role: 'Medical Team Lead' },
  { name: 'Billy Ngabire', role: 'KFMI Coordinator' },
];

const defaultTribe: TribeInfo = {
  icon: Shield,
  description: '',
  colors: 'from-blue-600 to-blue-700',
};

const BranchAdvisoryCommittee: React.FC<BranchAdvisoryCommitteeProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="Advisory Committee & Administration"
        description="Meet the Maine Branch Advisory Committee and Administration Team of ECG The Jesus Nation Church."
        path={`${basePath}/about/advisory-committee`}
      />

      <PageBanner
        title="Advisory Committee & Administration"
        subtitle="Meet the dedicated committee and administration team members serving the Maine Branch."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'About', href: `${basePath}/about` },
          { label: 'Advisory Committee' },
        ]}
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="text-yellow-400" size={36} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Advisory Committee</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The Maine Branch Advisory Committee is a group of dedicated leaders who provide counsel, oversight,
            and support to the ministry. Each member represents a tribe of Israel, reflecting the rich biblical
            heritage that guides our church community.
          </p>
        </div>
      </section>

      {/* Committee Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {committeeMembers.map((member, index) => {
              const tribe = tribeInfo[member.tribe] || defaultTribe;
              const Icon = tribe.icon;

              return (
                <motion.div
                  key={`${member.tribe}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${tribe.colors}`} />

                  <div className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${tribe.colors} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={32} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-lg font-bold text-blue-900 mb-1">{member.name}</h3>

                    <p className="text-sm text-gray-500 mb-3 leading-snug">{tribe.description}</p>

                    <span className={`inline-block bg-gradient-to-r ${tribe.colors} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {member.tribe} Tribe
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Administration Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center mb-6">
              <Users className="text-yellow-400" size={36} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Administration Team</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The dedicated team that keeps the Maine Branch running day to day, coordinating ministries, programs, and operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {adminTeam.map((member, index) => (
              <motion.div
                key={member.name + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group border border-gray-100"
              >
                <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-900" />
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{member.name}</h3>
                  <span className="inline-block bg-blue-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="mx-auto mb-6 text-yellow-400" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Together, Building Together</h2>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            From the twelve tribes of our advisory committee to the administration team that keeps everything running,
            we are united in purpose — to serve, guide, and strengthen the ECG Maine Branch for the glory of God.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BranchAdvisoryCommittee;
