import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !title || !card || !image || !text) return;

    const ctx = gsap.context(() => {
      // Background title horizontal scroll
      gsap.fromTo(
        title,
        { x: '-10%' },
        {
          x: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Card 3D flip entrance
      gsap.fromTo(
        card,
        { rotateX: 30, y: 100, opacity: 0 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image scale reveal
      gsap.fromTo(
        image,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text stagger reveal
      gsap.fromTo(
        text.querySelectorAll('.reveal-text'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax - optimized
      gsap.to(image, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect on card - throttled
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full bg-black overflow-hidden section-padding"
    >
      {/* Background Scrolling Title */}
      <div
        ref={titleRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0"
      >
        <span className="font-display text-[20vw] text-outline opacity-30 tracking-wider">
          ABOUT ME • ABOUT ME • ABOUT ME •
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-sm will-change-transform"
              style={{ perspective: '1000px' }}
            >
              <img
                src="/about-portrait.jpg"
                alt="About Vinod Raja"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Red accent border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform origin-left scale-x-0 hover:scale-x-100 transition-transform duration-500" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 rounded-sm -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 border border-red-600/30 rounded-sm -z-10" />
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2" ref={textRef}>
            <div
              ref={cardRef}
              className="glass-card p-8 md:p-12 rounded-sm will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="reveal-text font-body text-xs tracking-[0.3em] text-red-500 uppercase mb-4 block">
                Who I Am
              </span>

              <h2 className="reveal-text font-display text-section text-white mb-6">
                About Me
              </h2>

              <div className="space-y-4 mb-8">
                <p className="reveal-text font-body text-white/80 text-sm md:text-base leading-relaxed">
                  I&apos;m Vinod Raja, a passionate Machine Learning Engineer and Full-Stack
                  Developer specializing in building intelligent web applications with Django.
                </p>
                <p className="reveal-text font-body text-white/60 text-sm md:text-base leading-relaxed">
                  With expertise in both ML algorithms and modern web development, I bridge the
                  gap between data science and production-ready applications. From training
                  complex neural networks to deploying scalable Django APIs, I love turning
                  ideas into reality.
                </p>
                <p className="reveal-text font-body text-white/60 text-sm md:text-base leading-relaxed">
                  My tech stack includes Python, TensorFlow, PyTorch, Django, React, and
                  cloud platforms. I believe in clean code, robust architecture, and creating
                  solutions that make a real impact.
                </p>
              </div>

              <a
                href="#contact"
                className="reveal-text inline-flex items-center gap-3 font-body text-sm text-white group"
              >
                <span className="link-underline">Let&apos;s Connect</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
