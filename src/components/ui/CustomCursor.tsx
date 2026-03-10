import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const curPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterClickable = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '40px';
        cursorRef.current.style.height = '40px';
        cursorRef.current.style.background = 'rgba(34,197,94,0.1)';
        cursorRef.current.style.borderColor = 'rgba(34,197,94,0.6)';
      }
    };

    const onMouseLeaveClickable = () => {
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

    // Re-attach listeners on every DOM mutation (handles route changes)
    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea, [tabindex]');
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterClickable);
        el.removeEventListener('mouseleave', onMouseLeaveClickable);
        el.addEventListener('mouseenter', onMouseEnterClickable);
        el.addEventListener('mouseleave', onMouseLeaveClickable);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    const t = setTimeout(addListeners, 800);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '16px', height: '16px',
          border: '1.5px solid var(--accent-primary)',
          borderRadius: '50%', background: 'transparent',
          pointerEvents: 'none', zIndex: 99999,
          transition: 'width 0.25s, height 0.25s, background 0.25s, border-color 0.25s',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '4px', height: '4px',
          background: 'var(--accent-primary)',
          borderRadius: '50%', pointerEvents: 'none',
          zIndex: 100000, willChange: 'transform',
        }}
      />
    </>
  );
}