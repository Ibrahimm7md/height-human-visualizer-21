
export const convertFeetToCm = (feet: number): number => {
  return feet * 30.48;
};

export const convertCmToFeet = (cm: number): number => {
  return cm / 30.48;
};

export const formatHeight = (height: number, unit: 'cm' | 'ft'): string => {
  if (unit === 'cm') {
    return `${height} cm`;
  } else {
    const feet = Math.floor(height);
    const inches = Math.round((height - feet) * 12);
    return `${feet}'${inches}"`;
  }
};

export const parseHeightInput = (value: string, unit: 'cm' | 'ft'): number => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 0;
  
  if (unit === 'ft') {
    return convertFeetToCm(numValue);
  }
  return numValue;
};
