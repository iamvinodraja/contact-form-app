import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const cta = ctaRef.current;
    const links = linksRef.current;
    const copyright = copyrightRef.current;

    if (!footer || !cta || !links || !copyright) return;

    const ctx = gsap.context(() => {
      // CTA scale up
      gsap.fromTo(
        cta,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links fade in
      gsap.fromTo(
        links.querySelectorAll('a'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: links,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Copyright fade in
      gsap.fromTo(
        copyright,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: copyright,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  // Magnetic effect on CTA - throttled
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cta = ctaRef.current;
    if (!cta) return;

    const rect = cta.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cta, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const cta = ctaRef.current;
    if (!cta) return;

    gsap.to(cta, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  const socialLinks = [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black pt-24 md:pt-32 pb-8"
    >
      {/* Main CTA */}
      <div className="container-custom text-center mb-24 md:mb-32">
        <a
          ref={ctaRef}
          href="#contact"
          className="inline-block font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white hover:text-red-500 transition-colors duration-500 will-change-transform"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="flex items-center gap-4 md:gap-8">
            Let&apos;s Talk
            <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20" />
          </span>
        </a>
      </div>

      {/* Links Grid */}
      <div
        ref={linksRef}
        className="container-custom border-t border-white/10 pt-12 md:pt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs text-white/50 uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body text-xs text-white/50 uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs text-white/50 uppercase tracking-wider mb-6">
              Social
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-body text-xs text-white/50 uppercase tracking-wider mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:vinodraja@email.com"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors link-underline"
                >
                  vinodraja@email.com
                </a>
              </li>
              <li>
                <span className="font-body text-sm text-white/70">
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        ref={copyrightRef}
        className="container-custom border-t border-white/10 pt-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/40">
            © 2024 Vinod Raja. All Rights Reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            ML Engineer & Django Developer
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-colors z-50"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
