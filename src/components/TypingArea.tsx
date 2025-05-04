import React from 'react';
import Character from './Character';

interface TypingAreaProps {
  text: string;
  currentPosition: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, currentPosition }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <div className="flex flex-wrap">
        {text.split('').map((char, index) => {
          let status: 'current' | 'correct' | 'incorrect' | 'upcoming';
          
          if (index === currentPosition) {
            status = 'current';
          } else if (index < currentPosition) {
            status = 'correct';
          } else {
            status = 'upcoming';
          }
          
          return (
            <Character 
              key={index} 
              char={char} 
              status={status} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;