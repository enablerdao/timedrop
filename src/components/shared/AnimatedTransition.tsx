
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'slide-up' | 'fade' | 'slide-down' | 'slide-right' | 'slide-left';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all overflow-hidden';
    const durationClass = `duration-${duration}`;

    const animationClasses = {
      'slide-up': 'translate-y-8 opacity-0',
      'slide-down': '-translate-y-8 opacity-0',
      'slide-right': '-translate-x-8 opacity-0',
      'slide-left': 'translate-x-8 opacity-0',
      'fade': 'opacity-0',
    };

    return cn(
      baseClasses,
      durationClass,
      isVisible ? '' : animationClasses[animation]
    );
  };

  return (
    <div
      className={cn(getAnimationClasses(), className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
