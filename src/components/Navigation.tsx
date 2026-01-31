import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        lastScrollY = window.scrollY;
        setIsScrolled(lastScrollY > 100);
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (isScrolled) {
      gsap.to(nav, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'expo.out',
      });
    } else {
      gsap.to(nav, {
        y: -100,
        opacity: 0,
        duration: 0.2,
        ease: 'expo.out',
      });
    }
  }, [isScrolled]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0 -translate-y-full"
      >
        <div className="bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="container-custom">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a
                href="#"
                className="font-display text-xl md:text-2xl text-white hover:text-red-500 transition-colors"
              >
                VINOD RAJA
              </a>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full font-body text-sm text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Let&apos;s Talk
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 md:hidden ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="font-display text-4xl text-white hover:text-red-500 transition-colors"
              style={{
                transform: isMenuOpen
                  ? 'translateY(0)'
                  : `translateY(${20 + index * 10}px)`,
                opacity: isMenuOpen ? 1 : 0,
                transition: `all 0.5s ease ${index * 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full font-body text-sm text-white hover:bg-white hover:text-black transition-all duration-300"
            style={{
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(30px)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.5s ease 0.5s',
            }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>

      {/* Static Logo (visible on hero) */}
      <div
        className={`fixed top-6 left-6 md:top-8 md:left-12 z-30 transition-opacity duration-500 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a href="#" className="font-display text-xl md:text-2xl text-white">
          VINOD RAJA
        </a>
      </div>
    </>
  );
};

export default Navigation;
