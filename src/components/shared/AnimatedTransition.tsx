
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-right' | 'slide-left';
  delay?: number;
  duration?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'slide-right':
        return 'animate-slide-right';
      case 'slide-left':
        return 'animate-slide-left';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(
        'transition-all',
        isVisible ? getAnimationClass() : 'opacity-0',
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
        animationFillMode: 'forwards',
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
