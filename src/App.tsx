import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IPhone13MiniFrame } from './components/IPhone13MiniFrame';
import { PageOne } from './components/PageOne';
import { PageTwo } from './components/PageTwo';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { playWireframeClick } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [gridStyle, setGridStyle] = useState<'grid' | 'dots' | 'clean'>('grid');
  const [buttonPosition, setButtonPosition] = useState<'center' | 'bottom'>('center');
  const [styleVariant, setStyleVariant] = useState<'standard' | 'minimal' | 'blueprint'>('standard');
  const [showSpecs, setShowSpecs] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(0.92);

  // Navigation handlers
  const goToPageTwo = useCallback(() => {
    playWireframeClick(soundEnabled);
    setDirection(1);
    setCurrentPage(2);
  }, [soundEnabled]);

  const goToPageOne = useCallback(() => {
    playWireframeClick(soundEnabled);
    setDirection(-1);
    setCurrentPage(1);
  }, [soundEnabled]);

  const handleNavigate = useCallback(
    (targetPage: 1 | 2) => {
      if (targetPage === currentPage) return;
      playWireframeClick(soundEnabled);
      setDirection(targetPage > currentPage ? 1 : -1);
      setCurrentPage(targetPage);
    },
    [currentPage, soundEnabled]
  );

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting when user focuses an input if any
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentPage === 1) {
          goToPageTwo();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentPage === 2) {
          goToPageOne();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        if (currentPage === 1) {
          goToPageTwo();
        } else {
          goToPageOne();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, goToPageOne, goToPageTwo]);

  // Adjust scale responsively on initial load or resize
  useEffect(() => {
    const handleResize = () => {
      const availableHeight = window.innerHeight - 100; // Account for toolbar
      const deviceHeight = 840;
      if (availableHeight < deviceHeight) {
        const calculatedScale = Math.max(0.6, Math.min(1, (availableHeight - 40) / deviceHeight));
        setScale(Number(calculatedScale.toFixed(2)));
      } else {
        setScale(0.92);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 375 : -375,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -375 : 375,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 wireframe-grid-canvas text-black">
      {/* Workspace Navigation & Settings Toolbar */}
      <WorkspaceToolbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        gridStyle={gridStyle}
        setGridStyle={setGridStyle}
        buttonPosition={buttonPosition}
        setButtonPosition={setButtonPosition}
        styleVariant={styleVariant}
        setStyleVariant={setStyleVariant}
        showSpecs={showSpecs}
        setShowSpecs={setShowSpecs}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        scale={scale}
        setScale={setScale}
      />

      {/* Main Drafting Canvas Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
        {/* Subtle wireframe document header in canvas */}
        <div className="mb-4 text-center select-none">
          <span className="text-[11px] font-mono-spec uppercase tracking-widest text-neutral-500 font-semibold">
            PROGETTO WIREFRAME • SCHERMO {currentPage} DI 2
          </span>
        </div>

        {/* iPhone 13 mini Device Chassis */}
        <IPhone13MiniFrame
          gridStyle={gridStyle}
          showSpecs={showSpecs}
          showStatusBar={true}
          scale={scale}
        >
          {/* Animated Transition between Page 1 and Page 2 */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {currentPage === 1 ? (
                <motion.div
                  key="page-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.15 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <PageOne
                    onNext={goToPageTwo}
                    buttonPosition={buttonPosition}
                    styleVariant={styleVariant}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="page-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.15 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <PageTwo
                    onBack={goToPageOne}
                    buttonPosition={buttonPosition}
                    styleVariant={styleVariant}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </IPhone13MiniFrame>

        {/* Minimal Wireframe Status / Footer Note */}
        <footer className="mt-4 text-center select-none z-10">
          <p className="text-[11px] font-mono-spec text-neutral-600 tracking-tight">
            Premi{' '}
            <button
              onClick={() => (currentPage === 1 ? goToPageTwo() : goToPageOne())}
              className="font-bold underline text-black hover:text-neutral-700"
            >
              {currentPage === 1 ? '“avanti”' : '“indietro”'}
            </button>{' '}
            per passare a {currentPage === 1 ? 'Pagina 2' : 'Pagina 1'}
          </p>
        </footer>
      </main>
    </div>
  );
}
