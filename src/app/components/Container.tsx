'use client';
import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1300px] mx-auto px-9">
      {children}
    </div>
  );
};

export default Container;
