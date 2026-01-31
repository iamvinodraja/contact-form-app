import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, Brain, Code2, Server, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Machine Learning',
    description:
      'Building intelligent systems with cutting-edge ML algorithms. From predictive models to deep learning solutions, I develop AI-powered applications that solve real-world problems using TensorFlow, PyTorch, and scikit-learn.',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    id: 2,
    title: 'Django Development',
    description:
      'Creating robust, scalable web applications with Django. RESTful APIs, authentication systems, database design, and deployment to cloud platforms. Clean architecture with test-driven development.',
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: 3,
    title: 'Full-Stack Web Dev',
    description:
      'End-to-end web development combining powerful backends with modern React frontends. Responsive, performant, and user-friendly applications that deliver exceptional experiences.',
    icon: <Server className="w-6 h-6" />,
  },
  {
    id: 4,
    title: 'Data Engineering',
    description:
      'Designing data pipelines and infrastructure for ML workflows. ETL processes, database optimization, and cloud-based solutions that handle large-scale data efficiently.',
    icon: <Database className="w-6 h-6" />,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const bars = barsRef.current;
    const divider = dividerRef.current;

    if (!section || !title || !bars || !divider) return;

    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
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

      // Divider line draw
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Service bars stagger entrance
      const items = bars.querySelectorAll('.service-bar');
      gsap.fromTo(
        items,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: bars,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen w-full bg-black section-padding"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] text-red-500 uppercase mb-4 block">
            What I Do
          </span>
          <h2
            ref={titleRef}
            className="font-display text-section text-white"
          >
            Services
          </h2>
        </div>

        {/* Divider Line */}
        <div
          ref={dividerRef}
          className="h-px bg-white/20 mb-8 origin-left"
        />

        {/* Services Accordion */}
        <div ref={barsRef} className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-bar border-b border-white/10 origin-left"
            >
              {/* Service Header */}
              <button
                onClick={() => toggleExpand(service.id)}
                className="w-full py-6 md:py-8 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  {/* Index */}
                  <span className="font-body text-xs text-white/40 w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-red-500 group-hover:text-red-500 transition-all duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-white group-hover:text-red-500 transition-colors duration-300 text-left">
                    {service.title}
                  </h3>
                </div>

                {/* Expand Icon */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${
                    expandedId === service.id
                      ? 'bg-red-500 border-red-500 rotate-0'
                      : 'group-hover:border-white/40'
                  }`}
                >
                  {expandedId === service.id ? (
                    <Minus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedId === service.id ? 'max-h-64 pb-8' : 'max-h-0'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div className="pl-12 md:pl-28 pr-4">
                  <p className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-6 font-body text-sm text-white/80 hover:text-red-500 transition-colors group/link"
                  >
                    <span className="link-underline">Discuss this service</span>
                    <span className="transform group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="font-body text-white/50 text-sm mb-6">
            Have a project in mind?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full font-body text-sm text-white hover:bg-white hover:text-black transition-all duration-500 group"
          >
            <span>Let&apos;s work together</span>
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
