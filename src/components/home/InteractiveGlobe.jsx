import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe as GlobeIcon, Navigation, RotateCw } from 'lucide-react';

// Major Global University Destinations (Lat, Lon, Name, Country)
const DESTINATIONS = [
  { name: 'Harvard / MIT (Boston)', country: 'USA', lat: 42.3601, lon: -71.0589, color: '#0097B2' },
  { name: 'Oxford / Cambridge', country: 'UK', lat: 51.5074, lon: -0.1278, color: '#1AB0CB' },
  { name: 'Univ. of Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, color: '#38BDF8' },
  { name: 'TU Munich / Heidelberg', country: 'Germany', lat: 48.1351, lon: 11.5820, color: '#10B981' },
  { name: 'Univ. of Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, color: '#F59E0B' },
  { name: 'Univ. of Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, color: '#EC4899' },
];

const ORIGIN = { lat: 23.8103, lon: 90.4125 }; // Hub Origin (South Asia)

export default function InteractiveGlobe({ className = '', size = 380 }) {
  const canvasRef = useRef(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activePin, setActivePin] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angles in radians
  const rotYRef = useRef(0);
  const rotXRef = useRef(0.2); // slight downward tilt
  const dragStartRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.004, y: 0 });

  // Generate 3D Fibonacci sphere points (representing earth dot matrix)
  const spherePointsRef = useRef([]);
  
  useEffect(() => {
    const points = [];
    const numPoints = 650;
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phi;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Convert (x,y,z) back to lat/lon to check landmass approximation
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);

      // Rough landmass filtering for high aesthetic dot distribution
      const isLand = checkIsLandApprox(lat, lon);

      points.push({
        x, y, z,
        lat, lon,
        isLand,
        baseSize: isLand ? 1.8 : 1.1,
        alpha: isLand ? 0.85 : 0.25
      });
    }

    spherePointsRef.current = points;
  }, []);

  // Simple bounding boxes approximation for continental landmasses
  function checkIsLandApprox(lat, lon) {
    // North America
    if (lat > 15 && lat < 70 && lon > -160 && lon < -50) return true;
    // South America
    if (lat > -55 && lat < 12 && lon > -82 && lon < -34) return true;
    // Eurasia / Europe & Asia
    if (lat > 5 && lat < 75 && lon > -10 && lon < 150) return true;
    // Africa
    if (lat > -35 && lat < 37 && lon > -18 && lon < 52) return true;
    // Australia
    if (lat > -44 && lat < -10 && lon > 112 && lon < 154) return true;
    return Math.random() < 0.15; // Random dots in oceans for tech-grid feel
  }

  // Convert lat/lon to 3D sphere coordinate
  function latLonToVector3(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -(radius * Math.sin(phi) * Math.cos(theta)),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
  }

  // 3D Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particlePhase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation update
      if (isAutoRotate && !isDragging) {
        rotYRef.current += velocityRef.current.x;
      }

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);

      // Project 3D point to 2D
      const project = (v) => {
        // Rotate around Y axis
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        let y1 = v.y;

        // Rotate around X axis
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        return {
          px: cx + x2 * radius,
          py: cy - y2 * radius,
          pz: z2, // depth (positive = front, negative = back)
          scale: (z2 + 2) / 3,
        };
      };

      // 1. Draw Globe Outer Glow & Atmosphere Halo
      const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.25);
      outerGlow.addColorStop(0, 'rgba(0, 151, 178, 0.25)');
      outerGlow.addColorStop(0.5, 'rgba(0, 151, 178, 0.08)');
      outerGlow.addColorStop(1, 'rgba(0, 151, 178, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Globe Glass Sphere Base Gradient
      const sphereBg = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      sphereBg.addColorStop(0, 'rgba(13, 36, 43, 0.95)');
      sphereBg.addColorStop(0.7, 'rgba(6, 19, 23, 0.98)');
      sphereBg.addColorStop(1, 'rgba(0, 37, 45, 1)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereBg;
      ctx.shadowColor = 'rgba(0, 151, 178, 0.5)';
      ctx.shadowBlur = 25;
      ctx.fill();

      // Inner Rim Light
      ctx.lineWidth = 2;
      const rimGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      rimGrad.addColorStop(0, 'rgba(26, 176, 203, 0.8)');
      rimGrad.addColorStop(0.5, 'rgba(0, 151, 178, 0.2)');
      rimGrad.addColorStop(1, 'rgba(0, 75, 89, 0.6)');
      ctx.strokeStyle = rimGrad;
      ctx.stroke();
      ctx.restore();

      // 2. Draw Graticule Grid (Latitude/Longitude rings)
      ctx.strokeStyle = 'rgba(0, 151, 178, 0.12)';
      ctx.lineWidth = 1;
      [-45, 0, 45].forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 10) {
          const vec = latLonToVector3(lat, lon);
          const proj = project(vec);
          if (proj.pz > -0.2) {
            if (first) { ctx.moveTo(proj.px, proj.py); first = false; }
            else { ctx.lineTo(proj.px, proj.py); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      });

      // 3. Draw Dot Matrix Points (Front & Back hemispheres)
      spherePointsRef.current.forEach((pt) => {
        const proj = project(pt);

        // Opacity drops smoothly for points on the back side of the sphere
        if (proj.pz < -0.1) return; // Hide back dots for crisp look

        const depthAlpha = Math.max(0.1, (proj.pz + 0.3) / 1.3);
        const alpha = pt.alpha * depthAlpha;

        ctx.fillStyle = pt.isLand
          ? `rgba(26, 176, 203, ${alpha})`
          : `rgba(0, 151, 178, ${alpha * 0.4})`;

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pt.baseSize * proj.scale, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for key land dots
        if (pt.isLand && proj.pz > 0.4 && Math.random() < 0.05) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, pt.baseSize * proj.scale * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Draw Origin Pin (South Asia Study Hub)
      const originVec = latLonToVector3(ORIGIN.lat, ORIGIN.lon);
      const originProj = project(originVec);

      if (originProj.pz > 0) {
        // Pulse ring around origin
        const pulseR = (Date.now() / 25) % 18 + 4;
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - pulseR / 22})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(originProj.px, originProj.py, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#0097B2';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(originProj.px, originProj.py, 4.5 * originProj.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Flight Arcs to Global University Destinations & Pins
      particlePhase += 0.015;

      DESTINATIONS.forEach((dest, idx) => {
        const destVec = latLonToVector3(dest.lat, dest.lon);
        const destProj = project(destVec);

        // Draw Arc if visible or semi-visible
        if (originProj.pz > -0.2 && destProj.pz > -0.2) {
          // Quadratic Bezier Arc in 3D (Control point elevated above globe surface)
          const midLat = (ORIGIN.lat + dest.lat) / 2;
          const midLon = (ORIGIN.lon + dest.lon) / 2;
          const midVec = latLonToVector3(midLat, midLon, 1.35); // elevated arc
          const midProj = project(midVec);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(originProj.px, originProj.py);
          ctx.quadraticCurveTo(midProj.px, midProj.py, destProj.px, destProj.py);

          const arcGrad = ctx.createLinearGradient(originProj.px, originProj.py, destProj.px, destProj.py);
          arcGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
          arcGrad.addColorStop(0.5, dest.color);
          arcGrad.addColorStop(1, 'rgba(0, 151, 178, 0.2)');

          ctx.strokeStyle = arcGrad;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();

          // Traveling light particle along the arc
          const t = (particlePhase + idx * 0.16) % 1;
          const px = (1 - t) * (1 - t) * originProj.px + 2 * (1 - t) * t * midProj.px + t * t * destProj.px;
          const py = (1 - t) * (1 - t) * originProj.py + 2 * (1 - t) * t * midProj.py + t * t * destProj.py;

          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = dest.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Destination Pin on Globe Front Hemisphere
        if (destProj.pz > 0) {
          ctx.save();
          ctx.shadowColor = dest.color;
          ctx.shadowBlur = 15;

          // Glowing pin dot
          ctx.fillStyle = dest.color;
          ctx.beginPath();
          ctx.arc(destProj.px, destProj.py, 5 * destProj.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(destProj.px, destProj.py, 2 * destProj.scale, 0, Math.PI * 2);
          ctx.fill();

          // Text Label for Destination Pin
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.fillStyle = '#E6F5F7';
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 6;
          ctx.fillText(dest.name, destProj.px + 8, destProj.py + 3);

          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isAutoRotate, isDragging]);

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    rotYRef.current += dx * 0.005;
    rotXRef.current = Math.max(-0.8, Math.min(0.8, rotXRef.current + dy * 0.005));

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    rotYRef.current += dx * 0.005;
    rotXRef.current = Math.max(-0.8, Math.min(0.8, rotXRef.current + dy * 0.005));

    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#091b20]/90 backdrop-blur-md border border-[#0097B2]/40 shadow-lg text-[11px] font-bold text-slate-800 dark:text-[#E6F5F7]"
      >
        <GlobeIcon className="w-3.5 h-3.5 text-[#0097B2] dark:text-[#1AB0CB]" />
        <span>Interactive 3D University Globe</span>
      </motion.div>

      {/* Canvas Container */}
      <div
        className="relative cursor-grab active:cursor-grabbing touch-none group"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Glow backdrop behind canvas */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0097B2]/20 via-[#1AB0CB]/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-105 transition-transform duration-500" />

        <canvas
          ref={canvasRef}
          width={size * 1.3}
          height={size * 1.3}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative z-10 drop-shadow-[0_15px_35px_rgba(0,151,178,0.3)] transition-transform duration-300"
        />

        {/* Drag Hint Overlay (fades out on hover/drag) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 rounded-full bg-[#061317]/80 backdrop-blur-md text-[10px] font-medium text-cyan-200 border border-cyan-500/30 flex items-center gap-1.5">
            <Navigation className="w-3 h-3 text-[#1AB0CB] animate-bounce" />
            <span>Drag to spin 3D globe</span>
          </span>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex items-center gap-2 mt-2 z-20">
        <button
          type="button"
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200 flex items-center gap-1.5 border shadow-sm ${
            isAutoRotate
              ? 'bg-[#0097B2] text-white border-[#0097B2] shadow-[#0097B2]/30'
              : 'bg-white/80 dark:bg-[#091b20]/80 text-slate-700 dark:text-[#E6F5F7] border-slate-200 dark:border-zinc-700'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isAutoRotate ? 'Auto Rotating' : 'Paused'}</span>
        </button>

        <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-600 dark:text-zinc-400 bg-white/60 dark:bg-[#091b20]/60 px-3 py-1 rounded-full border border-slate-200/60 dark:border-zinc-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>500+ Campus Destinations</span>
        </div>
      </div>

    </div>
  );
}
