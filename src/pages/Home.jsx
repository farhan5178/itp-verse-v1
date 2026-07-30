import React from 'react';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import GuestHero from '../components/home/GuestHero';
import ExamOverview from '../components/home/ExamOverview';
import WhyEdwaay from '../components/home/WhyEdwaay';
import AISpeakingDemo from '../components/home/AISpeakingDemo';
import FeaturesSection from '../components/home/FeaturesSection';
import StudyPlanCTA from '../components/home/StudyPlanCTA';
import SuccessStories from '../components/home/SuccessStories';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative min-h-screen">
      {/* ── Dynamic Hero Section (LoggedIn Avatar vs Guest Landing) ── */}
      {isLoggedIn ? <HeroOnboarding /> : <GuestHero />}

      {/* ── Guest Onboarding Flow Sections ── */}
      {!isLoggedIn && (
        <>
          <ExamOverview />
          <WhyEdwaay />
          <AISpeakingDemo />
          <FeaturesSection />
          <StudyPlanCTA />
          <SuccessStories />
        </>
      )}
    </div>
  );
}
