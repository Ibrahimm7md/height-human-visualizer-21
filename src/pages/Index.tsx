
import React, { useState } from 'react';
import HeightInput from '@/components/HeightInput';
import HeightComparison from '@/components/HeightComparison';
import { convertFeetToCm } from '@/utils/heightUtils';

const Index = () => {
  const [person1Height, setPerson1Height] = useState<number>(0);
  const [person1Unit, setPerson1Unit] = useState<'cm' | 'ft'>('cm');
  const [person1Label, setPerson1Label] = useState<string>('Person 1');
  
  const [person2Height, setPerson2Height] = useState<number>(0);
  const [person2Unit, setPerson2Unit] = useState<'cm' | 'ft'>('cm');
  const [person2Label, setPerson2Label] = useState<string>('Person 2');

  // Convert heights to cm for comparison
  const person1HeightCm = person1Unit === 'ft' ? convertFeetToCm(person1Height) : person1Height;
  const person2HeightCm = person2Unit === 'ft' ? convertFeetToCm(person2Height) : person2Height;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Height Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter the heights of two people and see a visual comparison with accurate proportions
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              value={person1Label}
              onChange={(e) => setPerson1Label(e.target.value)}
              className="w-full p-2 text-center bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none text-lg font-medium"
              placeholder="Person 1 Name"
            />
            <HeightInput
              label="First Person"
              height={person1Height}
              unit={person1Unit}
              onHeightChange={setPerson1Height}
              onUnitChange={setPerson1Unit}
              placeholder="Enter height"
            />
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              value={person2Label}
              onChange={(e) => setPerson2Label(e.target.value)}
              className="w-full p-2 text-center bg-transparent border-b-2 border-red-300 focus:border-red-500 outline-none text-lg font-medium"
              placeholder="Person 2 Name"
            />
            <HeightInput
              label="Second Person"
              height={person2Height}
              unit={person2Unit}
              onHeightChange={setPerson2Height}
              onUnitChange={setPerson2Unit}
              placeholder="Enter height"
            />
          </div>
        </div>

        {/* Comparison Section */}
        <div className="max-w-6xl mx-auto">
          <HeightComparison
            person1Height={person1HeightCm}
            person2Height={person2HeightCm}
            person1Label={person1Label}
            person2Label={person2Label}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>💡 Tip: You can use custom names and switch between centimeters and feet!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
