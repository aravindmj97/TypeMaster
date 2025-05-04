import React from 'react';

interface CharacterProps {
  char: string;
  status: 'current' | 'correct' | 'incorrect' | 'upcoming';
}

const Character: React.FC<CharacterProps> = ({ char, status }) => {
  const getCharacterStyle = () => {
    switch (status) {
      case 'current':
        return 'bg-blue-100 border-b-2 border-blue-500 animate-pulse';
      case 'correct':
        return 'text-green-600';
      case 'incorrect':
        return 'text-red-600 bg-red-100';
      case 'upcoming':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <span className={`font-mono text-xl md:text-2xl px-[1px] rounded ${getCharacterStyle()}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
};

export default Character;