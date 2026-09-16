import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BranchData } from '../../hooks/useBranchData';
import BranchSEO from '../../components/branch/BranchSEO';
import PageBanner from '../../components/branch/PageBanner';

interface BranchBeliefsProps {
  data: BranchData;
}

const BranchBeliefs: React.FC<BranchBeliefsProps> = ({ data }) => {
  const { branch } = data;
  const basePath = '/maine';

  return (
    <div className="min-h-screen bg-white pb-16 xl:pb-0">
      <BranchSEO
        branch={branch}
        title="What We Believe"
        description="The Maine Branch operates under the doctrine and teachings of ECG The Jesus Nation Church USA."
        path={`${basePath}/about/beliefs`}
      />

      <PageBanner
        title="What We Believe"
        subtitle="Our doctrine and teachings as a branch of ECG The Jesus Nation Church USA."
        breadcrumbs={[
          { label: 'Home', href: basePath },
          { label: 'About', href: `${basePath}/about` },
          { label: 'Beliefs' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="mx-auto text-yellow-400 mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Rooted in the Doctrine of ECG-USA
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              As a branch of ECG The Jesus Nation Church USA, the Maine Branch is rooted in the doctrine,
              teachings, and spiritual vision of the church's headquarters. We do not maintain an independent
              doctrine but fully align with the beliefs and practices of ECG The Jesus Nation Church USA.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Statement of Faith</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We believe in the one true God, the Creator of all things, who exists eternally in three persons:
                the Father, the Son, and the Holy Spirit.
              </p>
              <p>
                We believe in the Lord Jesus Christ, the Savior of the world, who was conceived of the Holy Spirit,
                born of the Virgin Mary, was crucified, died, and was buried; on the third day He rose again and
                ascended to heaven, where He is seated at the right hand of the Father.
              </p>
              <p>
                We believe in the Holy Spirit, who guides, empowers, and transforms the lives of believers,
                equipping them for service and witness.
              </p>
              <p>
                We believe in the Bible as the inspired and infallible Word of God, our supreme authority in all
                matters of faith and conduct.
              </p>
              <p>
                We believe in salvation by grace through faith in Jesus Christ, and in the expectation of the
                personal return of our Lord and Savior.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              For the complete and official doctrine and beliefs of ECG The Jesus Nation Church USA,
              please visit the headquarters doctrine page.
            </p>
            <a
              href="/#mission"
              className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              View ECG-USA Doctrine & Beliefs
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchBeliefs;
