import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ML Predictive Analytics',
    category: 'Machine Learning',
    image: '/project-1.jpg',
  },
  {
    id: 2,
    title: 'Django E-Commerce API',
    category: 'Backend',
    image: '/project-2.jpg',
  },
  {
    id: 3,
    title: 'AI Chatbot Platform',
    category: 'Full-Stack',
    image: '/project-3.jpg',
  },
  {
    id: 4,
    title: 'Data Pipeline System',
    category: 'Data Engineering',
    image: '/project-4.jpg',
  },
];

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const list = listRef.current;

    if (!section || !title || !list) return;

    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        title,
        { y: 80, opacity: 0 },
        {
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

      // List items stagger entrance
      const items = list.querySelectorAll('.project-item');
      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Custom cursor follow - throttled with RAF
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${cursorPosRef.current.x}px`;
          cursorRef.current.style.top = `${cursorPosRef.current.y}px`;
        }
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleProjectHover = (id: number | null) => {
    setActiveProject(id);

    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    if (id !== null) {
      gsap.to(imageContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'expo.out',
      });
    } else {
      gsap.to(imageContainer, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'expo.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative min-h-screen w-full bg-black section-padding overflow-hidden"
    >
      {/* Background Image Container */}
      <div
        ref={imageContainerRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-0"
        style={{
          transform: 'scale(0.95)',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeProject === project.id ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor hidden md:flex items-center justify-center transition-all duration-300 ${
          activeProject !== null ? 'expanded' : ''
        }`}
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        {activeProject !== null && (
          <span className="font-body text-xs text-white uppercase tracking-wider">
            View
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-section text-white mb-16 md:mb-24"
        >
          Selected Works
        </h2>

        {/* Projects List */}
        <div ref={listRef} className="max-w-4xl">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-item group border-t border-white/10 py-8 md:py-12 cursor-pointer"
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-4 md:gap-8">
                  {/* Index */}
                  <span className="font-body text-xs text-white/40 w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title with liquid fill effect */}
                  <h3
                    className="font-display text-3xl md:text-5xl lg:text-6xl text-white transition-all duration-500 group-hover:text-red-500 relative overflow-hidden"
                    data-text={project.title}
                  >
                    <span className="relative z-10">{project.title}</span>
                  </h3>
                </div>

                {/* Category & Arrow */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-body text-xs md:text-sm text-white/50 uppercase tracking-wider hidden sm:block">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Mobile Image Preview */}
              <div className="sm:hidden mt-4 overflow-hidden h-0 group-hover:h-48 transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>

        {/* View All Link */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 font-body text-sm text-white/60 hover:text-white transition-colors group"
          >
            <span className="link-underline">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Works;
