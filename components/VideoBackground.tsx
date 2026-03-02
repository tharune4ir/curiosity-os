"use client";

import React, { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  isMuted: boolean;
  opacity: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ isMuted, opacity }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;

      // Aggressively attempt to play when component mounts or un-mutes
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented by browser, waiting for interaction:", error);
        });
      }
    }
  }, [isMuted, hasWindow]);

  if (!hasWindow) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out"
      style={{
        zIndex: -10,
        opacity: opacity,
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)'
      }}
    >
      <div className="absolute inset-0 w-full h-full scale-125">
        {/* Local 1080p MP4 Hologram Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted // crucial for initial hydration autoplay
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/feynman-bg.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Dark overlay to blend video into deep space */}
      <div className="absolute inset-0 bg-slate-950/20" />
    </div>
  );
};

export default VideoBackground;
