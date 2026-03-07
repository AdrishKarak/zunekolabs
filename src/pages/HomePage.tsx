import HeroSection from '../sections/Hero';
import { StatsCarousel } from '../sections/StatasCarousel';
import { ShowCaseCards } from '../sections/ShowCaseCards';
import { About } from '../sections/About';
import { ClaritySteps } from '../sections/ClaritySteps';
import { Works } from '../sections/Works';
import { SuccessStories } from '../sections/SuccessStories';
import { FAQsection } from '../sections/FAQsection';

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