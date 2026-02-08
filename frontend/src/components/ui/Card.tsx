import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  frosted?: boolean;
}

export function Card({ children, hover = false, frosted = true, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/60 bg-white/70 shadow-[0_4px_24px_0_rgba(60,64,67,0.10)] ${frosted ? 'backdrop-blur-md frosted' : ''} ${hover ? 'transition-shadow hover:shadow-lg' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-8 pt-8 pb-2 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-8 py-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-8 pb-8 pt-2 border-t border-white/60 ${className}`}>{children}</div>;
}
