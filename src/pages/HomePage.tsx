import { About } from "../sections/About";
import { ClaritySteps } from "../sections/ClaritySteps";
import { FAQsection } from "../sections/FAQsection";
import HeroSection from "../sections/Hero";

import { ShowCaseCards } from "../sections/ShowCaseCards";
import { StatsCarousel } from "../sections/StatasCarousel";
import { SuccessStories } from "../sections/SuccessStories";
import { Works } from "../sections/Works";

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
  )
}