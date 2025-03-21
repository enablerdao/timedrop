
import React from 'react';

const PriceDropBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 opacity-5 pointer-events-none">
      <svg
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="priceDropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.7" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0EA5E9" strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
        </defs>
        
        {/* Background grid */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        
        {/* Main Chart Line - Decreasing price line */}
        <path 
          d="M0,100 Q300,120 500,300 T900,500 T1200,600" 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="4"
          strokeDasharray="10,5"
          className="animate-pulse-soft"
        >
          <animate attributeName="strokeDashoffset" from="0" to="100" dur="15s" repeatCount="indefinite" />
        </path>
        
        {/* Price drop markers */}
        {[...Array(7)].map((_, i) => {
          const x = 100 + i * 150;
          const y = 150 + i * 60;
          return (
            <g key={i} className="animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
              <circle 
                cx={x} 
                cy={y} 
                r="12" 
                fill="url(#priceDropGradient)" 
                filter="url(#glow)" 
              >
                <animate 
                  attributeName="r" 
                  values="10;14;10" 
                  dur={`${3 + i * 0.5}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
              <path 
                d={`M${x-15},${y-15} L${x},${y+15} L${x+15},${y-15}`} 
                fill="none" 
                stroke="#0EA5E9" 
                strokeWidth="3" 
              />
            </g>
          );
        })}
        
        {/* Scattered price tags */}
        {[...Array(12)].map((_, i) => {
          const x = 50 + i * 100;
          const y = 100 + (i % 5) * 120;
          const price = 20000 - i * 1000;
          return (
            <g key={`tag-${i}`} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              <rect 
                x={x-30} 
                y={y-15} 
                width="60" 
                height="30" 
                rx="5" 
                fill="white" 
                fillOpacity="0.1" 
                stroke="#0EA5E9" 
                strokeWidth="1" 
              >
                <animate
                  attributeName="fillOpacity"
                  values="0.05;0.2;0.05"
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <text 
                x={x} 
                y={y+5} 
                fontSize="12" 
                fontFamily="sans-serif" 
                textAnchor="middle" 
                fill="#0EA5E9"
              >
                ¥{price}
              </text>
            </g>
          );
        })}
        
        {/* Falling droplets with animated paths */}
        {[...Array(15)].map((_, i) => {
          const x = 80 + i * 75;
          const y = 200 + (i % 3) * 150;
          const animDelay = i * 0.2;
          const animDur = 2 + Math.random() * 3;
          
          return (
            <g key={`drop-${i}`}>
              <path 
                d={`M${x},${y} 
                   C${x-10},${y-15} ${x-10},${y-25} ${x},${y-30} 
                   C${x+10},${y-25} ${x+10},${y-15} ${x},${y}`} 
                fill="#0EA5E9" 
                fillOpacity="0.6"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0; 0,${30 + Math.random() * 50}; 0,0`}
                  dur={`${animDur}s`}
                  begin={`${animDelay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fillOpacity"
                  values="0.6;0.9;0.6"
                  dur={`${animDur * 0.7}s`}
                  begin={`${animDelay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
        
        {/* Graph-like visualization with animated elements */}
        <g transform="translate(750, 250)">
          <rect x="0" y="0" width="300" height="200" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.3" />
          <polyline 
            points="0,50 50,60 100,90 150,130 200,150 250,190 300,170" 
            fill="none" 
            stroke="#0EA5E9" 
            strokeWidth="2" 
          >
            <animate
              attributeName="strokeDasharray"
              values="0,1000;600,1000"
              dur="3s"
              repeatCount="1"
              fill="freeze"
            />
          </polyline>
          <text x="150" y="220" fontSize="14" fontFamily="sans-serif" textAnchor="middle" fill="#0EA5E9" fillOpacity="0.5">TIME</text>
          <text x="-20" y="100" fontSize="14" fontFamily="sans-serif" textAnchor="middle" fill="#0EA5E9" fillOpacity="0.5" transform="rotate(-90, -20, 100)">PRICE</text>
          
          {/* Animated price point */}
          <circle cx="250" cy="190" r="5" fill="#F97316">
            <animate
              attributeName="r"
              values="3;6;3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        
        {/* Additional visual elements: Dotted grid lines */}
        <g>
          <line x1="0" y1="400" x2="1200" y2="400" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5,5" />
          <line x1="600" y1="0" x2="600" y2="800" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5,5" />
        </g>
        
        {/* Price notification symbols */}
        {[...Array(5)].map((_, i) => {
          const x = 200 + i * 180;
          const y = 650 + (i % 3) * 30;
          return (
            <g key={`bell-${i}`}>
              <path
                d={`M${x-5},${y+2} 
                    a5,5 0 1,0 10,0 
                    a5,5 0 1,0 -10,0 
                    M${x},${y-8} 
                    L${x},${y-3} 
                    M${x-7},${y-3} 
                    a7,7 0 1,0 14,0 
                    L${x-7},${y-3}`}
                stroke="#0EA5E9"
                strokeWidth="1.5"
                fill="none"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={`0 ${x} ${y-3}; 15 ${x} ${y-3}; -15 ${x} ${y-3}; 0 ${x} ${y-3}`}
                  dur="1s"
                  begin={`${i * 0.5 + 2}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PriceDropBackground;
