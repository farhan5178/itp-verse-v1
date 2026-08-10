import React from 'react';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import GuestHero from '../components/home/GuestHero';
import ExamOverview from '../components/home/ExamOverview';
import WhyEdwaay from '../components/home/WhyEdwaay';
import AISpeakingDemo from '../components/home/AISpeakingDemo';
import FeaturesSection from '../components/home/FeaturesSection';
import StudyRoadmap from '../components/home/StudyRoadmap';
import UniversityFinder from '../components/home/UniversityFinder';
import PricingSection from '../components/home/PricingSection';
import SuccessStories from '../components/home/SuccessStories';
import SuccessStatistics from '../components/home/SuccessStatistics';
import FAQSection from '../components/home/FAQSection';
import NewsletterSection from '../components/home/NewsletterSection';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative min-h-screen">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <>
          {/* ── Guest Landing Page Experience ── */}
          <GuestHero />
          <ExamOverview />
          <WhyEdwaay />
          <AISpeakingDemo />
          <FeaturesSection />
          <StudyRoadmap />
          <UniversityFinder />
          <PricingSection />
          <SuccessStories />
          <SuccessStatistics />
          <FAQSection />
          <NewsletterSection />
        </>
      )}
    </div>
  );
}


