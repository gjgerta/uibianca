import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface WireframeButtonProps {
  label: 'avanti' | 'indietro';
  onClick: () => void;
  direction?: 'forward' | 'back';
  styleVariant?: 'standard' | 'minimal' | 'blueprint';
}

export const WireframeButton: React.FC<WireframeButtonProps> = ({
  label,
  onClick,
  direction = label === 'avanti' ? 'forward' : 'back',
  styleVariant = 'standard',
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[56px] min-w-[200px] text-base font-semibold tracking-wide uppercase transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
        styleVariant === 'blueprint'
          ? 'bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
          : styleVariant === 'minimal'
          ? 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white active:scale-[0.98]'
          : 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-[0.98]'
      }`}
    >
      {/* Corner drafting crosshairs for wireframe blueprint feel */}
      <span className="absolute -top-1 -left-1 w-2 h-2 text-black font-mono-spec text-[10px] leading-none pointer-events-none opacity-40">
        +
      </span>
      <span className="absolute -top-1 -right-1 w-2 h-2 text-black font-mono-spec text-[10px] leading-none pointer-events-none opacity-40">
        +
      </span>
      <span className="absolute -bottom-1 -left-1 w-2 h-2 text-black font-mono-spec text-[10px] leading-none pointer-events-none opacity-40">
        +
      </span>
      <span className="absolute -bottom-1 -right-1 w-2 h-2 text-black font-mono-spec text-[10px] leading-none pointer-events-none opacity-40">
        +
      </span>

      {/* Wireframe directional arrow for indietro */}
      {direction === 'back' && (
        <ArrowLeft
          className="w-5 h-5 stroke-[2.2] transition-transform duration-150 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}

      {/* Main label */}
      <span className="font-mono-spec font-bold text-lg tracking-wider">
        {label}
      </span>

      {/* Wireframe directional arrow for avanti */}
      {direction === 'forward' && (
        <ArrowRight
          className="w-5 h-5 stroke-[2.2] transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </button>
  );
};
