import ZunekoLogo from "../../assets/Zuneko.svg";

const LogoText = () => (
  <span className="text-2xl font-extrabold tracking-tight">
    <span className="text-green-800">Zuneko</span>
    <span className="text-emerald-500">Labs</span>
  </span>
);

const footerLinks = {
  Services: [
    "AI Automation",
    "ERP Solutions",
    "Web Development",
    "App Development",
  ],
  Company: ["About Us", "Our Team", "Careers", "Blog"],
  Resources: ["Case Studies", "Documentation", "Support", "API Reference"],
};

const offices = [
  {
    title: "Kolkata HQ",
    address: "DH6/27, Action Area 1D, New Town, Kolkata – 700156",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9988162099685!2d88.481583!3d22.5791476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020be6e6fd5d37%3A0x6cab9abf7f8e4f48!2sEMDEE%20NEW%20OFFICE!5e0!3m2!1sen!2sin!4v1772903059360!5m2!1sen!2sin",
  },
  {
    title: "Kolkata Office 2",
    address: "2B, Saraswati Apartment, 114/1 Golaghata Road, Kolkata – 700048",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117887.52507870358!2d88.3428347!3d22.5796584!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02760ea963c899%3A0x1236b5af851aac57!2sEmdee%20Digitronics%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1772903093406!5m2!1sen!2sin",
  },
];

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100 pb-0">

      {/* Top emerald divider line */}
      <div className="h-px bg-linear-to-r from-transparent via-emerald-400 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-0">

        {/* Top grid: brand + links */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-3">
            <a href="/" className="flex items-center gap-2.5">
              <img src={ZunekoLogo} alt="ZunekoLabs" className="w-9 h-9" />
              <LogoText />
            </a>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs">
              Transforming businesses through intelligent automation and cutting-edge AI solutions. Your partner in digital innovation and growth.
            </p>

            {/* Contact info */}
            <div className="space-y-2 pt-0">
              <a href="mailto:sales@zuneko.ai" className="flex items-center gap-2.5 text-[1.05rem] text-gray-600 hover:text-emerald-600 transition-colors group">
                <span className="text-emerald-500 group-hover:text-emerald-600 transition-colors"><MailIcon /></span>
                sales@zuneko.ai
              </a>
              <a href="tel:+913340692109" className="flex items-center gap-2.5 text-[1.05rem] text-gray-600 hover:text-emerald-600 transition-colors group">
                <span className="text-emerald-500 group-hover:text-emerald-600 transition-colors"><PhoneIcon /></span>
                033 4069 2109
              </a>
              <div className="flex items-start gap-2.5 text-[1.05rem] text-gray-600">
                <span className="text-emerald-500 mt-0.5"><MapPinIcon /></span>
                <span>DH6/27, Action Area 1D,<br />New Town, Kolkata – 700156</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-gray-900 font-bold text-sm tracking-widest uppercase mb-3">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[1.05rem] text-gray-600 hover:text-emerald-600 transition-colors hover:translate-x-0.5 inline-block duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-5" />

        {/* Office locations with maps */}
        <div className="mb-3">
          <h4 className="text-gray-900 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-emerald-500 inline-block" />
            Our Offices
            <span className="w-6 h-px bg-emerald-500 inline-block" />
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offices.map((office) => (
              <div
                key={office.title}
                className="rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 transition-colors duration-300 bg-gray-50 group shadow-sm hover:shadow-md"
              >
                {/* Map iframe */}
                <div className="relative h-32 overflow-hidden">
                  <iframe
                    src={office.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    title={office.title}
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-t-2xl" />
                </div>
                {/* Office info */}
                <div className="px-4 py-3">
                  <p className="text-emerald-600 font-bold text-[1.05rem] mb-1">{office.title}</p>
                  <p className="text-gray-600 text-base leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0"><MapPinIcon /></span>
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar — copyright | socials | links */}
        <div className="h-px bg-gray-200 mb-3" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-base text-gray-500 py-3 pb-5">
          <p>© 2026 ZunekoLabs. All rights reserved.</p>

          {/* Socials centered */}
          <div className="flex items-center gap-2">
            {[
              { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
              { icon: <TwitterIcon />, href: "#", label: "Twitter" },
              { icon: <InstagramIcon />, href: "#", label: "Instagram" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 hover:border-emerald-300 flex items-center justify-center text-gray-500 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}