import React from 'react';

/**
 * SAPI Logo Component - Reusable across all pages
 * @param {number} size - Size of the logo in pixels (default: 96)
 */
export function SAPIGlobe({ size = 96 }) {
  const sizeClass = size === 56 ? 'w-14 h-14' : size === 96 ? 'w-24 h-24' : `w-[${size}px] h-[${size}px]`;
  
  return (
    <img
      src="/logo.png"
      alt="SAPI Logo"
      className={`${sizeClass} object-contain bg-transparent rounded-full p-1 box-border`}
      style={{
        WebkitMaskImage: 'radial-gradient(circle, white 100%, transparent 100%)',
        maskImage: 'radial-gradient(circle, white 100%, transparent 100%)'
      }}
    />
  );
}

export default SAPIGlobe;
