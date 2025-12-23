'use client';

import Snowfall from 'react-snowfall';
import { useMemo } from 'react';

export function SnowEffect() {
  const snowflakeCount = useMemo(() => 100, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1, // Below header (z-1000) but above background
      pointerEvents: 'none'
    }}>
      <Snowfall
        color="#a5f3fc" // Cyan/Turquoise tint
        snowflakeCount={snowflakeCount}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
