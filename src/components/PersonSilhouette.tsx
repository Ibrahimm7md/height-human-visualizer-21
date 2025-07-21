
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PersonSilhouetteProps {
  height: number; // height in cm
  label: string;
  color: string;
  maxHeight: number; // for scaling
}

const PersonSilhouette: React.FC<PersonSilhouetteProps> = ({
  height,
  label,
  color,
  maxHeight
}) => {
  const { t } = useLanguage();
  
  // Scale the silhouette based on the height ratio
  const scale = height > 0 ? (height / maxHeight) : 0.5;
  const displayHeight = Math.max(scale * 300, 50); // Minimum height of 50px

  return (
    <div className="flex flex-col items-center space-y-3">
      <div 
        className="relative flex items-end justify-center transition-all duration-500 ease-out"
        style={{ height: '320px' }}
      >
        <div
          className="flex flex-col items-center justify-end transition-all duration-500 ease-out"
          style={{ height: `${displayHeight}px` }}
        >
          {/* Head */}
          <div 
            className="rounded-full transition-all duration-500"
            style={{
              width: `${displayHeight * 0.15}px`,
              height: `${displayHeight * 0.15}px`,
              backgroundColor: color,
              marginBottom: `${displayHeight * 0.02}px`
            }}
          />
          
          {/* Body */}
          <div 
            className="rounded-lg transition-all duration-500"
            style={{
              width: `${displayHeight * 0.25}px`,
              height: `${displayHeight * 0.4}px`,
              backgroundColor: color,
              marginBottom: `${displayHeight * 0.02}px`
            }}
          />
          
          {/* Legs */}
          <div className="flex gap-1">
            <div 
              className="rounded-lg transition-all duration-500"
              style={{
                width: `${displayHeight * 0.08}px`,
                height: `${displayHeight * 0.4}px`,
                backgroundColor: color
              }}
            />
            <div 
              className="rounded-lg transition-all duration-500"
              style={{
                width: `${displayHeight * 0.08}px`,
                height: `${displayHeight * 0.4}px`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <p className="font-semibold text-gray-700 dark:text-gray-200">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{height > 0 ? `${height} cm` : t('enterHeight')}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{height > 0 ? `${(height / 30.48).toFixed(1)} ft` : ''}</p>
      </div>
    </div>
  );
};

export default PersonSilhouette;
