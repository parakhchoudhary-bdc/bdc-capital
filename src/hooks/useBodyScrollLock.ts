"use client";
import { useEffect, useCallback, useRef } from 'react';

interface ScrollData {
  isLocked: boolean;
  scrollTop: number;
  originalStyles: {
    overflow: string;
    position: string;
    top: string;
    width: string;
  };
}

interface UseBodyScrollLockProps {
  isLocked: boolean;
  scrollableSelector?: string;
}

const useBodyScrollLock = ({ isLocked, scrollableSelector = '.popup-content-scrollable' }: UseBodyScrollLockProps): void => {
  const scrollDataRef = useRef<ScrollData>({
    isLocked: false,
    scrollTop: 0,
    originalStyles: {
      overflow: '',
      position: '',
      top: '',
      width: ''
    }
  });

  const preventBodyScroll = useCallback(() => {
    if (scrollDataRef.current.isLocked) return;

    const body = document.body;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Store original styles and scroll position
    scrollDataRef.current = {
      isLocked: true,
      scrollTop,
      originalStyles: {
        overflow: body.style.overflow,
        position: body.style.position,
        top: body.style.top,
        width: body.style.width
      }
    };

    // Apply lock styles
    Object.assign(body.style, {
      overflow: 'hidden',
      position: 'fixed',
      top: `-${scrollTop}px`,
      width: '100%'
    });
  }, []);

  const restoreBodyScroll = useCallback(() => {
    if (!scrollDataRef.current.isLocked) return;

    const body = document.body;
    const { scrollTop, originalStyles } = scrollDataRef.current;
    
    // Restore original styles
    Object.assign(body.style, originalStyles);
    
    // Restore scroll position
    window.scrollTo(0, scrollTop);
    
    // Reset state
    scrollDataRef.current.isLocked = false;
  }, []);

  const touchMoveHandler = useCallback((e: TouchEvent) => {
    // Allow scrolling within specified scrollable content
    if (e.target instanceof Element && e.target.closest(scrollableSelector)) {
      return;
    }
    e.preventDefault();
  }, [scrollableSelector]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLocked) {
      timeoutId = setTimeout(() => {
        preventBodyScroll();
        // Add touch event listener for iOS
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      }, 0);
    } else {
      // Immediate cleanup when unlocking
      restoreBodyScroll();
      document.removeEventListener('touchmove', touchMoveHandler);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      if (!isLocked) {
        restoreBodyScroll();
        document.removeEventListener('touchmove', touchMoveHandler);
      }
    };
  }, [isLocked, touchMoveHandler, preventBodyScroll, restoreBodyScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      restoreBodyScroll();
      document.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [restoreBodyScroll, touchMoveHandler]);
};

export default useBodyScrollLock;