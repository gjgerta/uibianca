import React from 'react';
import {
  Grid,
  Volume2,
  VolumeX,
  Ruler,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
} from 'lucide-react';

interface WorkspaceToolbarProps {
  currentPage: 1 | 2;
  onNavigate: (page: 1 | 2) => void;
  gridStyle: 'grid' | 'dots' | 'clean';
  setGridStyle: (style: 'grid' | 'dots' | 'clean') => void;
  buttonPosition: 'center' | 'bottom';
  setButtonPosition: (pos: 'center' | 'bottom') => void;
  styleVariant: 'standard' | 'minimal' | 'blueprint';
  setStyleVariant: (v: 'standard' | 'minimal' | 'blueprint') => void;
  showSpecs: boolean;
  setShowSpecs: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  scale: number;
  setScale: (val: number) => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({
  currentPage,
  onNavigate,
  gridStyle,
  setGridStyle,
  buttonPosition,
  setButtonPosition,
  styleVariant,
  setStyleVariant,
  showSpecs,
  setShowSpecs,
  soundEnabled,
  setSoundEnabled,
  scale,
  setScale,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-50">
      {/* Primary Toolbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Project title & format */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-black flex items-center justify-center font-mono-spec font-bold text-xs bg-black text-white">
            W
          </div>
          <div>
            <h1 className="font-mono-spec font-bold text-sm tracking-tight text-black flex items-center gap-2">
              <span>WIRE_PROTOTYPE</span>
              <span className="text-neutral-400">/</span>
              <span className="text-xs bg-neutral-100 border border-neutral-300 px-1.5 py-0.5 rounded text-neutral-800">
                iPhone 13 mini
              </span>
            </h1>
          </div>
        </div>

        {/* Center: Interactive Page State & Direct Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 border-2 border-black p-1">
          <button
            onClick={() => onNavigate(1)}
            className={`px-3 py-1.5 text-xs font-mono-spec font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 1
                ? 'bg-black text-white'
                : 'text-neutral-700 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <span>PAGINA 1</span>
            <span className="text-[10px] opacity-75">(avanti)</span>
          </button>
          <span className="text-neutral-400 font-mono-spec px-1">↔</span>
          <button
            onClick={() => onNavigate(2)}
            className={`px-3 py-1.5 text-xs font-mono-spec font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 2
                ? 'bg-black text-white'
                : 'text-neutral-700 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <span>PAGINA 2</span>
            <span className="text-[10px] opacity-75">(indietro)</span>
          </button>
        </div>

        {/* Right: Quick Settings Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Disattiva feedback sonoro' : 'Attiva feedback sonoro'}
            className={`p-2 border border-black text-xs font-mono-spec transition-colors ${
              soundEnabled ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Wireframe Specs toggle */}
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            title="Mostra / Nascondi quote tecniche (375x812 pt)"
            className={`px-2.5 py-1.5 border border-black text-xs font-mono-spec flex items-center gap-1.5 transition-colors ${
              showSpecs ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QUOTE</span>
          </button>

          {/* Scale controls */}
          <div className="hidden md:flex items-center border border-black divide-x divide-black bg-white text-xs font-mono-spec">
            <button
              onClick={() => setScale(0.85)}
              className={`px-2 py-1.5 hover:bg-neutral-100 ${scale === 0.85 ? 'bg-neutral-200 font-bold' : ''}`}
            >
              85%
            </button>
            <button
              onClick={() => setScale(0.95)}
              className={`px-2 py-1.5 hover:bg-neutral-100 ${scale === 0.95 ? 'bg-neutral-200 font-bold' : ''}`}
            >
              95%
            </button>
            <button
              onClick={() => setScale(1)}
              className={`px-2 py-1.5 hover:bg-neutral-100 ${scale === 1 ? 'bg-neutral-200 font-bold' : ''}`}
            >
              100%
            </button>
          </div>

          {/* Options toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-2.5 py-1.5 border border-black text-xs font-mono-spec flex items-center gap-1.5 ${
              showAdvanced ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">OPZIONI</span>
          </button>
        </div>
      </div>

      {/* Secondary Drawer / Advanced Options */}
      {showAdvanced && (
        <div className="border-t border-neutral-300 bg-neutral-50 px-4 sm:px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono-spec">
            {/* Grid Pattern */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-semibold">GRIGLIA SCHERMO:</span>
              <div className="flex border border-black divide-x divide-black bg-white">
                <button
                  onClick={() => setGridStyle('grid')}
                  className={`px-2 py-1 ${gridStyle === 'grid' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Reticolo
                </button>
                <button
                  onClick={() => setGridStyle('dots')}
                  className={`px-2 py-1 ${gridStyle === 'dots' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Punti
                </button>
                <button
                  onClick={() => setGridStyle('clean')}
                  className={`px-2 py-1 ${gridStyle === 'clean' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Bianco
                </button>
              </div>
            </div>

            {/* Position inside screen */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-semibold">POSIZIONE BOTTONE:</span>
              <div className="flex border border-black divide-x divide-black bg-white">
                <button
                  onClick={() => setButtonPosition('center')}
                  className={`px-2 py-1 ${buttonPosition === 'center' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Al Centro
                </button>
                <button
                  onClick={() => setButtonPosition('bottom')}
                  className={`px-2 py-1 ${buttonPosition === 'bottom' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  In Basso (Thumb Zone)
                </button>
              </div>
            </div>

            {/* Button Style Variant */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-semibold">STILE BOTTONE:</span>
              <div className="flex border border-black divide-x divide-black bg-white">
                <button
                  onClick={() => setStyleVariant('standard')}
                  className={`px-2 py-1 ${styleVariant === 'standard' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setStyleVariant('blueprint')}
                  className={`px-2 py-1 ${styleVariant === 'blueprint' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Blueprint 3D
                </button>
                <button
                  onClick={() => setStyleVariant('minimal')}
                  className={`px-2 py-1 ${styleVariant === 'minimal' ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
                >
                  Minimal
                </button>
              </div>
            </div>

            {/* Keyboard shortcut info */}
            <div className="text-neutral-500 text-[11px] flex items-center gap-2">
              <span>Scorciatoie:</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded shadow-xs">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded shadow-xs">→</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded shadow-xs">Spazio</kbd>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
