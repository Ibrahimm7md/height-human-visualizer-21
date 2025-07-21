
import React from 'react';
import PersonSilhouette from './PersonSilhouette';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeightComparisonProps {
  person1Height: number; // in cm
  person2Height: number; // in cm
  person1Label: string;
  person2Label: string;
}

const HeightComparison: React.FC<HeightComparisonProps> = ({
  person1Height,
  person2Height,
  person1Label,
  person2Label
}) => {
  const { t } = useLanguage();
  const maxHeight = Math.max(person1Height, person2Height, 180); // Minimum reference height
  const heightDifference = Math.abs(person1Height - person2Height);

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-8">
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">{t('heightComparison')}</h3>
      
      {heightDifference > 0 && (
        <div className="text-center mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            {t('heightDifference')}: {heightDifference.toFixed(1)} cm ({(heightDifference / 30.48).toFixed(1)} ft)
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
            {person1Height > person2Height ? person1Label : person2Label} {t('isTaller')}
          </p>
        </div>
      )}
      
      <div className="relative flex justify-center items-end space-x-12">
        {/* Height difference visualization - horizontal line */}
        {heightDifference > 0 && person1Height > 0 && person2Height > 0 && (
          <div className="absolute top-0 left-0 right-0 pointer-events-none">
            {/* Horizontal line from tallest person's head to shorter person's head level */}
            <div 
              className="absolute bg-yellow-400 shadow-lg"
              style={{
                height: '3px',
                width: '12rem', // spans between the two people
                top: `${((maxHeight - Math.max(person1Height, person2Height)) / maxHeight) * 300}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '2px'
              }}
            />
            
            {/* Vertical line down to shorter person's head - positioned at center of head */}
            <div 
              className="absolute bg-yellow-400 shadow-lg"
              style={{
                width: '3px',
                height: `${(heightDifference / maxHeight) * 300}px`,
                top: `${((maxHeight - Math.max(person1Height, person2Height)) / maxHeight) * 300}px`,
                left: person1Height > person2Height 
                  ? 'calc(50% + 6rem)' // Right side - center of shorter person's head
                  : 'calc(50% - 6rem)', // Left side - center of shorter person's head
                borderRadius: '2px'
              }}
            />
            
            {/* Height difference label */}
            <div 
              className="absolute bg-yellow-100 dark:bg-yellow-900/80 border-2 border-yellow-400 rounded-lg px-3 py-2 text-sm font-bold text-yellow-800 dark:text-yellow-200 whitespace-nowrap shadow-lg"
              style={{
                top: `${((maxHeight - Math.max(person1Height, person2Height)) / maxHeight) * 300 - 40}px`,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {t('heightDifferenceLabel')} {heightDifference.toFixed(1)} cm
            </div>
          </div>
        )}
        
        <PersonSilhouette
          height={person1Height}
          label={person1Label}
          color="#3B82F6"
          maxHeight={maxHeight}
        />
        <PersonSilhouette
          height={person2Height}
          label={person2Label}
          color="#EF4444"
          maxHeight={maxHeight}
        />
      </div>
      
      {person1Height > 0 && person2Height > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold text-blue-800 dark:text-blue-200">{person1Label}</p>
            <p className="text-blue-600 dark:text-blue-300">{person1Height} cm</p>
            <p className="text-blue-600 dark:text-blue-300">{(person1Height / 30.48).toFixed(1)} ft</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="font-semibold text-red-800 dark:text-red-200">{person2Label}</p>
            <p className="text-red-600 dark:text-red-300">{person2Height} cm</p>
            <p className="text-red-600 dark:text-red-300">{(person2Height / 30.48).toFixed(1)} ft</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeightComparison;
