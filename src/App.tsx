import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

import HomePage from './pages/HomePage';

import GrainOverlay from './components/ui/GrainOverlay';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CustomCursor from './components/ui/CustomCursor';
import PageLoadOverlay from './components/ui/PageLoadOverlay';
import ArtificialIntelligence from './service/AIML/pages/artificialintelligence';

export default function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    };

    initLenis();

    return () => cleanup?.();
  }, []);

  return (
    <BrowserRouter>
      <GrainOverlay />
      <ScrollProgressBar />
      <CustomCursor />
      <PageLoadOverlay />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--bg-void)',
      }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/aiml/artificial-intelligence" element={<ArtificialIntelligence />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}