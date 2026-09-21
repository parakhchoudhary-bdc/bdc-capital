import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

const VideoSection: React.FC<{ src: string, className?: string }> = ({ src, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useBodyScrollLock({ isLocked: isOpen });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const openVideo = () => setIsOpen(true);
  const closeVideo = () => setIsOpen(false);

  return (
    <>
      <div
        className={`${className} relative w-full aspect-video rounded-3xl overflow-hidden lg:h-[86vh]`}
      >
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div
          onClick={openVideo}
          className="bg-black/50 absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center cursor-pointer transition-colors duration-300"
        >
          <img
            src="/icons/play.svg"
            alt="play"
            className="w-8 h-8 lg:w-10 lg:h-10 xl:w-16 xl:h-16 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {isOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-90 bg-black/70 flex justify-center items-center p-4 md:p-10">
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-visible shadow-2xl">
              <button
                onClick={closeVideo}
                className="absolute -top-4 -right-2 md:-right-4 z-100 w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 1L1 13M1 1L13 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <video
                src={src}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain rounded-2xl bg-black"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default VideoSection