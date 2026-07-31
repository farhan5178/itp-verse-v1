import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

/**
 * AIAvatar Component
 * Uses the exact 3D Student / Mentor avatars from GuestHero:
 *  - Male: /img/happy_mentor_student.png
 *  - Female: /img/confused_female_student.png
 */
export default function AIAvatar({ isReady, gender }) {
  const { user } = useAuth();
  const currentGender = gender || user?.gender || 'male';

  const isFemale = currentGender === 'female';
  const avatarSrc = isFemale ? '/img/happy_female_student.png' : '/img/happy_mentor_student.png';
  const avatarAlt = isFemale ? 'Edwaay Happy Female Student Avatar' : 'Edwaay Male Student Mentor Avatar';

  return (
    <div className="relative select-none flex flex-col items-center justify-center" style={{ width: 220, height: 290 }}>
      {/* Ambient Pulsing Glow Aura */}
      <motion.div
        animate={{
          scale: [0.95, 1.25, 0.95],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute w-56 h-56 ${isFemale ? 'bg-pink-500/20' : 'bg-[#0097B2]/25'} rounded-full blur-3xl -z-10 pointer-events-none`}
      />

      {/* Floating Avatar Container */}
      <motion.div
        animate={isReady ? {
          y: [0, -10, 0],
          rotate: [0, isFemale ? -1.5 : 1.5, 0],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="w-48 sm:w-56 h-auto max-h-[260px] object-contain drop-shadow-[0_15px_30px_rgba(0,151,178,0.3)] hover:drop-shadow-[0_20px_40px_rgba(0,151,178,0.45)] transition-all duration-300"
        />

        {/* Subtle Ground Glow Shadow */}
        <motion.div
          animate={{
            scaleX: [1, 0.75, 1],
            opacity: [0.35, 0.15, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-36 h-3 rounded-full bg-[#0097B2]/30 blur-sm mt-1"
        />
      </motion.div>
    </div>
  );
}
