'use client';

import { useState, useRef, useEffect } from 'react';
import { scriptureData } from '@/lib/scripture';

export function ScriptureTooltip({ reference }: { reference: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const text = scriptureData[reference as keyof typeof scriptureData];

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // If there's less than 150px of space above the reference, show tooltip below it instead
      if (rect.top < 150) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  }, [isOpen]);

  // Handle outside click/tap to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (!text) {
    // Graceful fallback if reference not found
    return <span className="font-medium">{reference}</span>;
  }

  return (
    <span 
      ref={containerRef}
      className="relative inline-block cursor-pointer font-medium text-primary hover:text-primary-light underline decoration-primary/30 decoration-dashed underline-offset-4 transition-colors"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        // Prevent default in case it's inside a link
        e.preventDefault(); 
        setIsOpen(!isOpen);
      }}
    >
      {reference}
      
      {isOpen && (
        <span 
          className={`absolute z-[100] w-72 p-4 left-1/2 -translate-x-1/2 bg-slate-900 border-slate-700 text-white text-sm rounded-xl shadow-xl border text-left cursor-auto animate-in fade-in zoom-in-95 duration-200 ${
            position === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="block font-bold mb-2 text-emerald-400 font-serif text-base">{reference}</span>
          <span className="block leading-relaxed" dangerouslySetInnerHTML={{ __html: text }}></span>
          
          <span className={`absolute left-1/2 -translate-x-1/2 border-[6px] border-transparent ${
            position === 'top' ? 'top-full border-t-slate-900' : 'bottom-full border-b-slate-900'
          }`}></span>
        </span>
      )}
    </span>
  );
}
