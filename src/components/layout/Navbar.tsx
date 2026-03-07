import { useState } from "react";

import ZunekoLogo from "../../assets/Zuneko.svg";
import Button from "../ui/Button";

const navLinks = [
  { label: "ZunekoLabs Hub", href: "#" },
  {
    label: "Who We Are",
    href: "#",
    dropdown: ["Our Story", "Team", "Mission & Vision", "Careers"],
  },
  {
    label: "Services",
    href: "#",
    dropdown: ["AI Workflows", "ERP Implementation", "Automation", "Consulting"],
  },
  {
    label: "Industries",
    href: "#",
    dropdown: ["Healthcare", "Finance", "Retail", "Manufacturing"],
  },
  {
    label: "Insights",
    href: "#",
    dropdown: ["Blog", "Case Studies", "Whitepapers", "News"],
  },
  {
    label: "Let's Connect",
    href: "#",
    dropdown: ["Contact Us", "Book a Call", "Partner With Us"],
  },
];

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Renders "ZunekoLabs" with Zuneko in dark green, Labs in emerald
const LogoText = () => (
  <span className="text-2xl font-extrabold tracking-tight">
    <span className="text-green-800">Zuneko</span>
    <span className="text-emerald-500">Labs</span>
  </span>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <img src={ZunekoLogo} alt="ZunekoLabs logo" className="w-8 h-8" />
            <LogoText />
          </a>

          {/* Desktop Nav — hover-based dropdowns */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-[1rem] text-gray-600 hover:text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    {link.label}
                    <span className="transition-transform duration-200 group-hover:rotate-180">
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Invisible bridge so dropdown doesn't close when moving cursor down */}
                  <div className="absolute top-full left-0 w-full h-2 bg-transparent" />

                  <div className="absolute top-[calc(100%+0.4rem)] left-0 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-[1rem] text-gray-600 hover:text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navLinks.map((link) => (
            <div key={link.label}>
              <button
                onClick={() =>
                  link.dropdown &&
                  setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                }
                className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-700 border-b border-gray-50"
              >
                {link.label}
                {link.dropdown && (
                  <span className={`transition-transform ${mobileDropdown === link.label ? "rotate-180" : ""}`}>
                    <ChevronDown />
                  </span>
                )}
              </button>
              {link.dropdown && mobileDropdown === link.label && (
                <div className="pl-4 py-1">
                  {link.dropdown.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block py-2 text-sm text-gray-500 hover:text-emerald-700"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
            <Button variant="primary" size="md" fullWidth>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}