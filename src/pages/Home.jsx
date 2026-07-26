import React from 'react';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import GuestHero from '../components/home/GuestHero';
import ExamOverview from '../components/home/ExamOverview';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative min-h-screen">
      {/* ── Dynamic Hero Section (LoggedIn Avatar vs Guest Landing) ── */}
      {isLoggedIn ? <HeroOnboarding /> : <GuestHero />}

      {/* ── Exam Overview (For Guests) ── */}
      {!isLoggedIn && <ExamOverview />}
    </div>
  );
}
