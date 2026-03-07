import { useEffect } from 'react';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import GrainOverlay from './components/ui/GrainOverlay';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CustomCursor from './components/ui/CustomCursor';
import PageLoadOverlay from './components/ui/PageLoadOverlay';

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    };

    initLenis();
  }, []);

  return (
    <>
      <GrainOverlay />
      <ScrollProgressBar />
      <CustomCursor />
      <PageLoadOverlay />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-void)' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <HomePage />
        </main>
        <Footer />
      </div>
    </>
  );
}