import HeroSection from '../sections-Homapage/Hero';
import { StatsCarousel } from '../sections-Homapage/StatasCarousel';
import { ShowCaseCards } from '../sections-Homapage/ShowCaseCards';
import { About } from '../sections-Homapage/About';
import { ClaritySteps } from '../sections-Homapage/ClaritySteps';
import { Works } from '../sections-Homapage/Works';
import { SuccessStories } from '../sections-Homapage/SuccessStories';
import { FAQsection } from '../sections-Homapage/FAQsection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsCarousel />
      <ShowCaseCards />
      <About />
      <ClaritySteps />
      <Works />
      <SuccessStories />
      <FAQsection />
    </main>
  );
}