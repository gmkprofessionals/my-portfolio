'use client';
import React, { Suspense } from 'react';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <div className="text-center py-10">Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
