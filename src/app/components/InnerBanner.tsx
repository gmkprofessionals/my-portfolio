"use client";
import React from 'react';
import Image from 'next/image';

const InnerBanner = () => {
  return (
    <div>
      <div className="flex w-full h-[400px] mb-9">
        <Image alt="Business-Consulting-Services" src="/inr_bnr.png" width={1522} height={250} />
       </div>
    </div>
  )
}

export default InnerBanner;
