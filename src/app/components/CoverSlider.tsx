'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = ['/Slide1.jpg', '/Slide2.jpg', '/Slide3.jpg'];

const CoverSlider: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1600}
              height={600}
              className="w-full h-auto object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverSlider;
