import React from 'react';
import { useParams } from 'react-router-dom';
import { useBranchData } from '../hooks/useBranchData';
import BranchHeader from '../components/branch/BranchHeader';
import BranchFooter from '../components/branch/BranchFooter';
import MobileBottomBar from '../components/branch/MobileBottomBar';
import ScrollToTop from '../components/ScrollToTop';
import BranchHome from '../pages/branch/BranchHome';
import BranchAbout from '../pages/branch/BranchAbout';
import BranchLeadership from '../pages/branch/BranchLeadership';
import BranchBeliefs from '../pages/branch/BranchBeliefs';
import BranchVisit from '../pages/branch/BranchVisit';
import BranchMinistries from '../pages/branch/BranchMinistries';
import BranchCellGroups from '../pages/branch/BranchCellGroups';
import BranchEvents from '../pages/branch/BranchEvents';
import BranchWatch from '../pages/branch/BranchWatch';
import BranchPrayer from '../pages/branch/BranchPrayer';
import BranchTestimonies from '../pages/branch/BranchTestimonies';
import BranchGive from '../pages/branch/BranchGive';
import BranchGetInvolved from '../pages/branch/BranchGetInvolved';
import BranchContact from '../pages/branch/BranchContact';

interface BranchLayoutProps {
  page: string;
}

const BranchLayout: React.FC<BranchLayoutProps> = ({ page }) => {
  const { branchSlug = 'maine' } = useParams<{ branchSlug: string }>();
  const data = useBranchData(branchSlug);

  if (data.error && !data.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Branch Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the branch you're looking for.</p>
          <a href="/" className="text-blue-700 hover:text-blue-900 font-bold">Return to ECG-USA</a>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <BranchHome data={data} />;
      case 'about': return <BranchAbout data={data} />;
      case 'leadership': return <BranchLeadership data={data} />;
      case 'beliefs': return <BranchBeliefs data={data} />;
      case 'visit': return <BranchVisit data={data} />;
      case 'ministries': return <BranchMinistries data={data} />;
      case 'cell-groups': return <BranchCellGroups data={data} />;
      case 'events': return <BranchEvents data={data} />;
      case 'watch': return <BranchWatch data={data} />;
      case 'prayer': return <BranchPrayer data={data} />;
      case 'testimonies': return <BranchTestimonies data={data} />;
      case 'give': return <BranchGive data={data} />;
      case 'get-involved': return <BranchGetInvolved data={data} />;
      case 'contact': return <BranchContact data={data} />;
      default: return <BranchHome data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BranchHeader branch={data.branch} />
      {renderPage()}
      <BranchFooter branch={data.branch} serviceTimes={data.serviceTimes} />
      <MobileBottomBar />
      <ScrollToTop />
    </div>
  );
};

export default BranchLayout;
