import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);
  const diagonalRef = useRef<SVGLineElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const name = nameRef.current;
    const role = roleRef.current;
    const greeting = greetingRef.current;
    const location = locationRef.current;
    const diagonal = diagonalRef.current;

    if (!section || !image || !name || !role || !greeting || !location || !diagonal) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(image, { scale: 1.2, filter: 'blur(10px)' });
      gsap.set(name.querySelectorAll('.char'), { y: '100%', rotate: 5, opacity: 0 });
      gsap.set(role, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(greeting, { y: 30, opacity: 0 });
      gsap.set(location, { y: 30, opacity: 0 });
      gsap.set(diagonal, { strokeDashoffset: 1000 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(image, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'expo.out',
      })
        .to(
          diagonal,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          greeting,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
          },
          0.2
        )
        .to(
          name.querySelectorAll('.char'),
          {
            y: '0%',
            rotate: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'expo.out',
          },
          0.2
        )
        .to(
          role,
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power2.out',
          },
          0.4
        )
        .to(
          location,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
          },
          0.6
        );

      // Scroll parallax effects - optimized
      gsap.to(image, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, // Smoother scrub
        },
      });

      gsap.to(name, {
        y: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse move handler for diagonal tilt - throttled
  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        lastX = (e.clientX / window.innerWidth - 0.5) * 2;
        lastY = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePosition({ x: lastX, y: lastY });
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Split name into characters
  const nameText = 'VINOD RAJA';
  const nameChars = nameText.split('').map((char, i) => (
    <span key={i} className="char inline-block overflow-hidden">
      <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <img
          src="/hero-portrait.jpg"
          alt="Vinod Raja"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Diagonal Line SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          ref={diagonalRef}
          x1="55"
          y1="0"
          x2="35"
          y2="100"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.1"
          strokeDasharray="1000"
          style={{
            transform: `rotate(${mousePosition.x * 2}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease-out',
          }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center container-custom">
        <div className="max-w-4xl">
          {/* Greeting */}
          <span
            ref={greetingRef}
            className="font-body text-sm md:text-base tracking-[0.3em] text-white/70 uppercase mb-4 block"
          >
            Hello, I&apos;m
          </span>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-display text-hero text-white leading-none mb-4 overflow-hidden"
          >
            {nameChars}
          </h1>

          {/* Role */}
          <p
            ref={roleRef}
            className="font-display text-large text-white/90 tracking-wider mb-6"
          >
            ML Engineer & Django Developer
          </p>

          {/* Location */}
          <span
            ref={locationRef}
            className="font-body text-sm tracking-[0.2em] text-white/60 uppercase animate-tracking-breathe"
          >
            Building Intelligent Web Solutions
          </span>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;
