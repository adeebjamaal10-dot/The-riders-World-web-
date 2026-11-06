import React from 'react';
import sorentaLogoImg from '../assets/sorenta-logo.png';
import { SORENTA_LOGO_BASE64 } from '../assets/sorentaLogoData';

interface SorentaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
}

const SIZE_MAP = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24'
};

export const SorentaLogo: React.FC<SorentaLogoProps> = ({
  className = '',
  size = 'md',
  withBorder = false
}) => {
  return (
    <div 
      className={`inline-flex items-center justify-center bg-black overflow-hidden flex-shrink-0 select-none ${
        SIZE_MAP[size]
      } ${
        withBorder ? 'border border-gray-300 shadow-xs' : ''
      } ${className}`}
    >
      <img
        src={sorentaLogoImg || SORENTA_LOGO_BASE64}
        alt="Sorenta Saddlery Official Logo"
        className="w-full h-full object-contain p-0.5"
        onError={(e) => {
          if (e.currentTarget.src !== SORENTA_LOGO_BASE64) {
            e.currentTarget.src = SORENTA_LOGO_BASE64;
          }
        }}
      />
    </div>
  );
};
