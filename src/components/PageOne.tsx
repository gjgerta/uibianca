import React from 'react';
import { WireframeButton } from './WireframeButton';

interface PageOneProps {
  onNext: () => void;
  buttonPosition?: 'center' | 'bottom';
  styleVariant?: 'standard' | 'minimal' | 'blueprint';
}

export const PageOne: React.FC<PageOneProps> = ({
  onNext,
  buttonPosition = 'center',
  styleVariant = 'standard',
}) => {
  return (
    <div
      className={`w-full h-full flex ${
        buttonPosition === 'bottom'
          ? 'flex-col justify-end items-center pb-16 px-6'
          : 'flex-col justify-center items-center p-6'
      }`}
    >
      <WireframeButton
        label="avanti"
        onClick={onNext}
        direction="forward"
        styleVariant={styleVariant}
      />
    </div>
  );
};
