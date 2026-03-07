import ZunekoLogo from "../assets/Zuneko.svg";
import heroVideo from "../assets/Zuneko.mp4";
import Button from "../components/ui/Button";


const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
      />

      {/* Overlay — light white wash so text stays readable */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Logo icon */}
        <div className="mb-5 animate-[fadeDown_0.6s_ease_both]">
          <div className="w-20 h-20 rounded-2xl shadow-xl overflow-hidden ring-1 ring-emerald-200">
            <img
              src={ZunekoLogo}
              alt="ZunekoLabs"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-semibold mb-6 animate-[fadeDown_0.7s_ease_both]">
          <SparkleIcon />
          AI-Powered IT Solutions
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-6 animate-[fadeDown_0.8s_ease_both]">
          Increase your Business
          <br />
          Productivity with
          <br />
          <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-green-400 bg-clip-text text-transparent">
            ZunekoLabs
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-2xl mb-4 animate-[fadeDown_0.9s_ease_both]">
          Transform your business operations with intelligent automation and
          AI-powered solutions. We turn complex processes into{" "}
          <em className="font-semibold not-italic text-gray-900">simple</em>,
          scalable systems.
        </p>

        {/* Trusted badge */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10 animate-[fadeDown_1s_ease_both]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Trusted by 15+ businesses in 12 months
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-[fadeDown_1.1s_ease_both]">
          <Button variant="primary" size="lg">
            Start Your AI Transformation →
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}