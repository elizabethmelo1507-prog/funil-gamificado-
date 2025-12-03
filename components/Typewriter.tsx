import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 30, 
  className = '', 
  onComplete,
  startDelay = 0 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return text;
        }
        const nextChar = text.charAt(index);
        index++;
        return text.slice(0, index);
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started, onComplete]);

  return <span className={className}>{displayedText}</span>;
};