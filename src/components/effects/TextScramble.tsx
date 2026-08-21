import React, { useEffect, useRef, useState } from 'react';
import { soundFx } from '../../utils/soundEffects';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________01';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  scrambleOnHover?: boolean;
  triggerOnMount?: boolean;
  hoverSound?: boolean;
  children?: React.ReactNode;
}

export function TextScramble({
  text,
  className = '',
  as: Component = 'span',
  scrambleOnHover = true,
  triggerOnMount = false,
  hoverSound = false,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    if (hoverSound) {
      soundFx.playHover();
    }

    const length = text.length;
    let iteration = 0;
    const totalIterations = length * 2.5;

    const update = () => {
      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < iteration / 2.5) {
          result += text[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (iteration < totalIterations) {
        iteration += 1;
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    setDisplayText(text);
    if (triggerOnMount) {
      const timer = setTimeout(() => {
        startScramble();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [text, triggerOnMount]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      startScramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-default select-none transition-colors ${className}`}
    >
      {displayText}
    </Component>
  );
}
