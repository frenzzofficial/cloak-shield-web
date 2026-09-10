"use client";
import { useCardInteractive } from "@/packages/hooks/gsap/useCardInteractive";
import { cn } from "@/packages/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  key?: string;
}

const Card = ({ key, children, className }: CardProps) => {
  const { cardRef, glareRef } = useCardInteractive({
    tilt: 12,
    perspective: 1000,
    glare: true,
    float: true,
    floatDistance: 5,
    floatDuration: 2.8,
  });

  return (
    <div
      key={key}
      ref={cardRef}
      className={cn(
        "relative z-10 w-full max-w-75 overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]/95 p-6 shadow-2xl backdrop-blur-sm transform-3d",
        className,
      )}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute z-20 h-32 w-32 rounded-full bg-brand-400/15 opacity-0 blur-2xl"
      />

      <div className="relative z-10 transform-[translateZ(30px)]">
        {children}
      </div>
    </div>
  );
};

export default Card;
