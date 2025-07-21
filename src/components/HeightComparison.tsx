
import React from 'react';
import PersonSilhouette from './PersonSilhouette';

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
  const maxHeight = Math.max(person1Height, person2Height, 180); // Minimum reference height
  const heightDifference = Math.abs(person1Height - person2Height);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Height Comparison</h3>
      
      {heightDifference > 0 && (
        <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold text-blue-800">
            Height Difference: {heightDifference.toFixed(1)} cm ({(heightDifference / 30.48).toFixed(1)} ft)
          </p>
          <p className="text-sm text-blue-600 mt-1">
            {person1Height > person2Height ? person1Label : person2Label} is taller
          </p>
        </div>
      )}
      
      <div className="relative flex justify-center items-end space-x-12">
        {/* Height difference visualization line */}
        {heightDifference > 0 && person1Height > 0 && person2Height > 0 && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
            {/* Line from tallest person's head */}
            <div 
              className="absolute bg-yellow-400 shadow-lg rounded-full"
              style={{
                width: '3px',
                height: `${(heightDifference / maxHeight) * 300}px`,
                top: `${((maxHeight - Math.max(person1Height, person2Height)) / maxHeight) * 300}px`,
                left: person1Height > person2Height ? '-6rem' : '6rem',
              }}
            />
            
            {/* Horizontal line to shorter person */}
            <div 
              className="absolute bg-yellow-400 shadow-lg rounded-full"
              style={{
                width: `${person1Height > person2Height ? '6rem' : '6rem'}`,
                height: '3px',
                top: `${((maxHeight - Math.min(person1Height, person2Height)) / maxHeight) * 300}px`,
                left: person1Height > person2Height ? '-6rem' : '0',
              }}
            />
            
            {/* Height difference label */}
            <div 
              className="absolute bg-yellow-100 border-2 border-yellow-400 rounded-lg px-3 py-1 text-sm font-bold text-yellow-800 whitespace-nowrap shadow-lg"
              style={{
                top: `${((maxHeight - Math.min(person1Height, person2Height)) / maxHeight) * 300 - 15}px`,
                left: person1Height > person2Height ? '-5rem' : '1rem',
              }}
            >
              +{heightDifference.toFixed(1)} cm
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
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-800">{person1Label}</p>
            <p className="text-blue-600">{person1Height} cm</p>
            <p className="text-blue-600">{(person1Height / 30.48).toFixed(1)} ft</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-semibold text-red-800">{person2Label}</p>
            <p className="text-red-600">{person2Height} cm</p>
            <p className="text-red-600">{(person2Height / 30.48).toFixed(1)} ft</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeightComparison;
