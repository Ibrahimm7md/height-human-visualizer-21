
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeightInputProps {
  label: string;
  height: number;
  unit: 'cm' | 'ft';
  onHeightChange: (height: number) => void;
  onUnitChange: (unit: 'cm' | 'ft') => void;
  placeholder?: string;
}

const HeightInput: React.FC<HeightInputProps> = ({
  label,
  height,
  unit,
  onHeightChange,
  onUnitChange,
  placeholder = "Enter height"
}) => {
  const { language } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onHeightChange(value);
  };

  return (
    <div className="space-y-3 p-6 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20">
      <Label className="text-lg font-semibold text-gray-700 dark:text-gray-200">{label}</Label>
      <div className={`flex gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <Input
          type="number"
          value={height || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 text-lg"
          min="0"
          step="0.1"
        />
        <Select value={unit} onValueChange={(value: 'cm' | 'ft') => onUnitChange(value)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cm">cm</SelectItem>
            <SelectItem value="ft">ft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {unit === 'ft' && height > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {height} ft = {Math.round(height * 30.48)} cm
        </p>
      )}
      {unit === 'cm' && height > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {height} cm = {(height / 30.48).toFixed(1)} ft
        </p>
      )}
    </div>
  );
};

export default HeightInput;
