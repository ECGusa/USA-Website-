import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ModernHeader from './components/ModernHeader';
import HeroSlider from './components/HeroSlider';
import WelcomeSection from './components/WelcomeSection';
import PresidentsMessage from './components/PresidentsMessage';
import Mission from './components/Mission';
import Ministries from './components/Ministries';
import Events from './components/Events';
import Testimonials from './components/Testimonials';
import LeadershipSlider from './components/LeadershipSlider';
import CampusSlider from './components/CampusSlider';
import MobileAppPromo from './components/MobileAppPromo';
import Give from './components/Give';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';
import VisitUs from './pages/VisitUs';
import BranchLayout from './layouts/BranchLayout';

function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead />
      <ModernHeader />
      <HeroSlider />
      <WelcomeSection />
      <PresidentsMessage />
      <Mission />
      <Ministries />
      <Events />
      <Testimonials />
      <LeadershipSlider />
      <CampusSlider />
      <MobileAppPromo />
      <Give />
      <Footer hideContact />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Main ECG-USA site */}
          <Route path="/" element={<Home />} />
          <Route path="/visit-us" element={<VisitUs />} />

          {/* Branch sub-sites (multi-branch architecture) */}
          <Route path="/:branchSlug" element={<BranchLayout page="home" />} />
          <Route path="/:branchSlug/about" element={<BranchLayout page="about" />} />
          <Route path="/:branchSlug/about/leadership" element={<BranchLayout page="leadership" />} />
          <Route path="/:branchSlug/about/beliefs" element={<BranchLayout page="beliefs" />} />
          <Route path="/:branchSlug/visit" element={<BranchLayout page="visit" />} />
          <Route path="/:branchSlug/ministries" element={<BranchLayout page="ministries" />} />
          <Route path="/:branchSlug/cell-groups" element={<BranchLayout page="cell-groups" />} />
          <Route path="/:branchSlug/events" element={<BranchLayout page="events" />} />
          <Route path="/:branchSlug/watch" element={<BranchLayout page="watch" />} />
          <Route path="/:branchSlug/prayer" element={<BranchLayout page="prayer" />} />
          <Route path="/:branchSlug/testimonies" element={<BranchLayout page="testimonies" />} />
          <Route path="/:branchSlug/give" element={<BranchLayout page="give" />} />
          <Route path="/:branchSlug/get-involved" element={<BranchLayout page="get-involved" />} />
          <Route path="/:branchSlug/contact" element={<BranchLayout page="contact" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
