import React, { useState, useRef, useCallback } from 'react';

export default function DraggableWindow({ children, handle = '.title-bar', cancel = '.btn' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    // Check if click is on cancel element
    if (cancel && e.target.closest(cancel)) {
      return;
    }

    // Check if click is on handle element
    if (handle && !e.target.closest(handle)) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);

    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [handle, cancel]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    e.preventDefault();
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Constrain to viewport
    const maxX = window.innerWidth - elementRef.current.offsetWidth;
    const maxY = window.innerHeight - elementRef.current.offsetHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {children}
    </div>
  );
}