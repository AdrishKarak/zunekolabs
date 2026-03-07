import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const curPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterClickable = () => {
      isHovering.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.width = '40px';
        cursorRef.current.style.height = '40px';
        cursorRef.current.style.background = 'rgba(0,232,122,0.1)';
        cursorRef.current.style.borderColor = 'rgba(0,232,122,0.6)';
      }
    };

    const onMouseLeaveClickable = () => {
      isHovering.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.width = '16px';
        cursorRef.current.style.height = '16px';
        cursorRef.current.style.background = 'transparent';
        cursorRef.current.style.borderColor = 'var(--accent-primary)';
      }
    };

    const loop = () => {
      const lerp = 0.12;
      curPos.current.x += (mousePos.current.x - curPos.current.x) * lerp;
      curPos.current.y += (mousePos.current.y - curPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curPos.current.x}px, ${curPos.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea, [tabindex]');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterClickable);
        el.addEventListener('mouseleave', onMouseLeaveClickable);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    // Add clickable listeners after a short delay to catch dynamically rendered elements
    const t = setTimeout(addListeners, 500);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '16px',
          height: '16px',
          border: '1.5px solid var(--accent-primary)',
          borderRadius: '50%',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.25s var(--ease-smooth), height 0.25s var(--ease-smooth), background 0.25s, border-color 0.25s',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          background: 'var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
        }}
      />
    </>
  );
}
