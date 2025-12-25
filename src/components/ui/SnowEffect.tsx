'use client';

import Snowfall from 'react-snowfall';
import { useMemo } from 'react';

export function SnowEffect() {
  const snowflakeCount = useMemo(() => 30, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1, // Behind content
      pointerEvents: 'none'
    }}>
      <Snowfall
        color="#D4AF37" // Gold tint
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
