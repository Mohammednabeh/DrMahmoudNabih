import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { QualificationsView } from './components/QualificationsView';
import { LicensesView } from './components/LicensesView';
import { ExperienceView } from './components/ExperienceView';
import { KnowledgeCenterView } from './components/KnowledgeCenterView';
import { FAQView } from './components/FAQView';
import { ContactView } from './components/ContactView';
import { CMSGuideView } from './components/CMSGuideView';
import { CMSStudioModal } from './components/CMSStudioModal';
import { DoctorPhotoModal } from './components/DoctorPhotoModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

const AppContent: React.FC = () => {
  const { activeTab } = useCMS();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-slate-900 selection:text-white transition-colors duration-200">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'qualifications' && <QualificationsView />}
        {activeTab === 'licenses' && <LicensesView />}
        {activeTab === 'experience' && <ExperienceView />}
        {activeTab === 'knowledge' && <KnowledgeCenterView />}
        {activeTab === 'faq' && <FAQView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'cms-guide' && <CMSGuideView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Authentication Gate Modal */}
      <AdminAuthModal />

      {/* Interactive Framer CMS Studio Modal */}
      <CMSStudioModal />

      {/* Official Doctor Photo Modal */}
      <DoctorPhotoModal />

      {/* Patient Consultation & Appointment Booking Modal */}
      <ConsultationBookingModal />

      {/* Floating WhatsApp & Fast Booking Action Button */}
      <FloatingWhatsAppButton />

    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
