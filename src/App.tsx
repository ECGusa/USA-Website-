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
          <Route path="/" element={<Home />} />
          <Route path="/visit-us" element={<VisitUs />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
