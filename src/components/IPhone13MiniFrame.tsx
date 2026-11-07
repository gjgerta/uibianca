import React from 'react';
import { Wifi } from 'lucide-react';

interface IPhone13MiniFrameProps {
  children: React.ReactNode;
  gridStyle?: 'grid' | 'dots' | 'clean';
  showSpecs?: boolean;
  showStatusBar?: boolean;
  scale?: number;
}

export const IPhone13MiniFrame: React.FC<IPhone13MiniFrameProps> = ({
  children,
  gridStyle = 'grid',
  showSpecs = false,
  showStatusBar = true,
  scale = 1,
}) => {
  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-200 select-none"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Dimension Spec Markers (Blueprint / Wireframe Documentation Overlay) */}
      {showSpecs && (
        <>
          {/* Top Width Spec */}
          <div className="absolute -top-10 left-0 right-0 flex items-center justify-between text-[11px] font-mono-spec font-bold text-black border-b border-black pb-1">
            <span className="text-black">|</span>
            <span className="bg-white px-2 tracking-wider">375 pt (iPhone 13 mini)</span>
            <span className="text-black">|</span>
          </div>

          {/* Right Height Spec */}
          <div className="absolute -right-16 top-0 bottom-0 flex flex-col items-center justify-between text-[11px] font-mono-spec font-bold text-black border-l border-black pl-1.5 py-2">
            <span>—</span>
            <span className="bg-white py-2 rotate-90 whitespace-nowrap tracking-wider">
              812 pt
            </span>
            <span>—</span>
          </div>

          {/* Corner Radius Spec */}
          <div className="absolute -bottom-8 left-0 text-[10px] font-mono-spec text-neutral-600">
            r: 44pt (Bezel) / 40pt (Screen)
          </div>

          {/* Model Identification */}
          <div className="absolute -bottom-8 right-0 text-[10px] font-mono-spec text-neutral-600 text-right">
            5.4" • 19.5:9 RATIO
          </div>
        </>
      )}

      {/* Hardware Buttons on Outer Frame */}
      {/* Left side: Silent Switch & Volume Buttons */}
      <div className="absolute -left-[5px] top-[108px] w-[5px] h-[26px] bg-black rounded-l-[2px]" title="Silent Switch" />
      <div className="absolute -left-[5px] top-[152px] w-[5px] h-[48px] bg-black rounded-l-[2px]" title="Volume Up" />
      <div className="absolute -left-[5px] top-[214px] w-[5px] h-[48px] bg-black rounded-l-[2px]" title="Volume Down" />

      {/* Right side: Power / Lock Button */}
      <div className="absolute -right-[5px] top-[168px] w-[5px] h-[68px] bg-black rounded-r-[2px]" title="Power / Lock" />

      {/* Outer iPhone 13 mini Chassis */}
      <div
        className="relative bg-white border-[3px] border-black rounded-[50px] p-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
        style={{
          width: '395px',
          height: '832px',
        }}
      >
        {/* Inner Screen Display (Exact 375px × 812px viewport) */}
        <div
          className={`relative w-[371px] h-[808px] rounded-[40px] overflow-hidden flex flex-col bg-white border border-black/30 ${
            gridStyle === 'grid'
              ? 'wireframe-grid-phone'
              : gridStyle === 'dots'
              ? 'wireframe-dots-phone'
              : 'bg-white'
          }`}
        >
          {/* Top Notch (iPhone 13 mini specific: 154px width, 28px height) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[154px] h-[28px] bg-black rounded-b-[18px] flex items-center justify-center px-4">
            {/* Speaker Ear Piece */}
            <div className="w-12 h-1 bg-neutral-800 rounded-full" />
            {/* Front Camera circle */}
            <div className="absolute right-6 w-2.5 h-2.5 rounded-full border border-neutral-700 bg-neutral-900" />
          </div>

          {/* Wireframe Status Bar */}
          {showStatusBar && (
            <div className="relative z-20 w-full h-[44px] px-7 pt-3 flex items-center justify-between text-black text-xs font-mono-spec select-none">
              {/* Left: Clock */}
              <span className="font-bold tracking-tight text-[13px]">9:41</span>

              {/* Right: Wireframe Signal, Wifi, Battery */}
              <div className="flex items-center gap-2">
                {/* 4-bar wireframe cell signal */}
                <div className="flex items-end gap-[1.5px] h-3" title="Signal">
                  <div className="w-[2.5px] h-[4px] bg-black" />
                  <div className="w-[2.5px] h-[6px] bg-black" />
                  <div className="w-[2.5px] h-[9px] bg-black" />
                  <div className="w-[2.5px] h-[12px] bg-black" />
                </div>

                {/* Wireframe Wifi icon */}
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

                {/* Wireframe Battery symbol */}
                <div className="flex items-center" title="Battery: 100%">
                  <div className="w-[22px] h-[11px] border-[1.5px] border-black rounded-[3px] p-[1.5px] flex items-center">
                    <div className="w-full h-full bg-black rounded-[1px]" />
                  </div>
                  <div className="w-[1.5px] h-[4px] bg-black rounded-r-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* Main App Content Area (fills the rest of the screen) */}
          <div className="relative flex-1 w-full overflow-hidden">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="relative z-20 w-full pb-2.5 pt-1 flex justify-center pointer-events-none">
            <div className="w-32 h-[4.5px] bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
