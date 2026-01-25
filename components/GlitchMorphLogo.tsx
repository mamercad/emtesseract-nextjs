'use client';

import React, { useState, useEffect } from 'react';

export default function GlitchMorphLogo() {
  const [morphProgress, setMorphProgress] = useState(0);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [scanLineOffset, setScanLineOffset] = useState(0);
  const [corruptedText, setCorruptedText] = useState('M4_INIT');

  // Morph animation
  useEffect(() => {
    const morphInterval = setInterval(() => {
      setMorphProgress((prev) => (prev + 0.015) % 1);
    }, 50);
    return () => clearInterval(morphInterval);
  }, []);

  // Glitch effect - random bursts (reduced frequency for cleaner look)
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.85; // Reduced from 0.7 to 0.85 (15% chance instead of 30%)
      if (shouldGlitch) {
        setGlitchIntensity(Math.random() * 0.8); // Slightly reduced intensity
        setGlitchOffset({
          x: (Math.random() - 0.5) * 10, // Reduced from 12 to 10
          y: (Math.random() - 0.5) * 6   // Reduced from 8 to 6
        });
      } else {
        setGlitchIntensity(0);
        setGlitchOffset({ x: 0, y: 0 });
      }
    }, 120); // Slightly slower interval (was 100ms)
    return () => clearInterval(glitchInterval);
  }, []);

  // Scan line animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLineOffset((prev) => (prev + 2) % 200);
    }, 50);
    return () => clearInterval(scanInterval);
  }, []);

  // Corrupted text changes
  useEffect(() => {
    const textOptions = [
      'M4_INIT', 'TESS_ERR', '01001101', 'DIM_4>>>',
      'M^4=???', 'CORRUPT', 'HYPRCUBE', 'EM_LOAD'
    ];
    const textInterval = setInterval(() => {
      setCorruptedText(textOptions[Math.floor(Math.random() * textOptions.length)]);
    }, 300);
    return () => clearInterval(textInterval);
  }, []);

  const t = morphProgress;
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Generate the morph path
  const getMorphPath = (offsetX = 0, offsetY = 0) => {
    if (ease < 0.5) {
      // M shape morphing to square
      const progress = ease * 2;
      return `
        M ${lerp(30, 40, progress) + offsetX} ${lerp(150, 140, progress) + offsetY}
        L ${lerp(30, 40, progress) + offsetX} ${lerp(50, 60, progress) + offsetY}
        L ${lerp(65, 100, progress) + offsetX} ${lerp(110, 60, progress) + offsetY}
        L ${lerp(100, 100, progress) + offsetX} ${lerp(50, 60, progress) + offsetY}
        L ${lerp(100, 100, progress) + offsetX} ${lerp(150, 140, progress) + offsetY}
        Z
      `;
    } else {
      // Square to tesseract
      return `
        M ${40 + offsetX} ${140 + offsetY}
        L ${40 + offsetX} ${60 + offsetY}
        L ${100 + offsetX} ${60 + offsetY}
        L ${100 + offsetX} ${140 + offsetY}
        Z
      `;
    }
  };

  const innerCubeOpacity = ease > 0.5 ? lerp(0, 1, (ease - 0.5) * 2) : 0;

  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
        <defs>
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dark background */}
        <rect x="0" y="0" width="200" height="200" fill="#0a0a0a" />

        {/* Scan lines */}
        {[...Array(50)].map((_, i) => (
          <rect
            key={i}
            x="0"
            y={i * 4}
            width="200"
            height="1"
            fill="rgba(255,255,255,0.03)"
          />
        ))}

        {/* Moving scan line */}
        <rect
          x="0"
          y={scanLineOffset}
          width="200"
          height="2"
          fill="rgba(0, 255, 255, 0.15)"
        />
        <rect
          x="0"
          y={(scanLineOffset + 100) % 200}
          width="200"
          height="1"
          fill="rgba(255, 0, 255, 0.1)"
        />

        {/* Glitch bars */}
        {glitchIntensity > 0.5 && (
          <>
            <rect
              x="0"
              y={30 + glitchOffset.y * 5}
              width="200"
              height={3 + glitchIntensity * 4}
              fill="cyan"
              opacity={glitchIntensity * 0.7}
            />
            <rect
              x="0"
              y={150 - glitchOffset.y * 3}
              width="200"
              height={2 + glitchIntensity * 3}
              fill="magenta"
              opacity={glitchIntensity * 0.5}
            />
          </>
        )}

        {/* Main shape group */}
        <g transform="translate(30, 0)">
          {/* Cyan layer */}
          <g style={{ transform: `translate(${glitchOffset.x}px, ${glitchOffset.y * 0.5}px)` }}>
            <path
              d={getMorphPath()}
              fill="none"
              stroke="cyan"
              strokeWidth="2.5"
              opacity="0.7"
            />
            {ease > 0.5 && (
              <g opacity={innerCubeOpacity * 0.7}>
                <rect
                  x="55" y="75"
                  width="50" height="50"
                  fill="none"
                  stroke="cyan"
                  strokeWidth="2"
                />
              </g>
            )}
          </g>

          {/* Magenta layer */}
          <g style={{ transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y * 0.5}px)` }}>
            <path
              d={getMorphPath()}
              fill="none"
              stroke="magenta"
              strokeWidth="2.5"
              opacity="0.7"
            />
            {ease > 0.5 && (
              <g opacity={innerCubeOpacity * 0.7}>
                <rect
                  x="55" y="75"
                  width="50" height="50"
                  fill="none"
                  stroke="magenta"
                  strokeWidth="2"
                />
              </g>
            )}
          </g>

          {/* White core layer */}
          <path
            d={getMorphPath()}
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {/* Inner cube */}
          {ease > 0.5 && (
            <g opacity={innerCubeOpacity}>
              <rect
                x="55" y="75"
                width="50" height="50"
                fill="none"
                stroke="white"
                strokeWidth="2"
                filter="url(#glow)"
              />
              
              {/* Connecting lines */}
              <g>
                <line x1="40" y1="60" x2="55" y2="75" stroke="white" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="105" y2="75" stroke="white" strokeWidth="1.5" />
                <line x1="40" y1="140" x2="55" y2="125" stroke="white" strokeWidth="1.5" />
                <line x1="100" y1="140" x2="105" y2="125" stroke="white" strokeWidth="1.5" />
              </g>

              {/* Vertex points */}
              {[[40,60], [100,60], [40,140], [100,140], [55,75], [105,75], [55,125], [105,125]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill="white" filter="url(#glow)" />
              ))}
            </g>
          )}
        </g>

        {/* Corrupted data display */}
        <text
          x="15"
          y="188"
          fontSize="9"
          fill="#00ff00"
          opacity="0.6"
          fontFamily="monospace"
        >
          {corruptedText}
        </text>
      </svg>
    </div>
  );
}
