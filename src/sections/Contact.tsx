import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !title || !form || !info) return;

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

      // Form fields stagger
      const fields = form.querySelectorAll('.form-field');
      gsap.fromTo(
        fields,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info cards stagger
      const cards = info.querySelectorAll('.info-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/contact-messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Complete Error Details:', error);
      setIsSubmitting(false);
      alert(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-black section-padding"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-body text-xs tracking-[0.3em] text-red-500 uppercase mb-4 block">
            Get In Touch
          </span>
          <h2
            ref={titleRef}
            className="font-display text-section text-white"
          >
            Contact
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="form-field">
              <label
                htmlFor="name"
                className="block font-body text-xs text-white/50 uppercase tracking-wider mb-3"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 font-body text-white text-lg focus:outline-none focus:border-red-500 transition-colors placeholder:text-white/20"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="form-field">
              <label
                htmlFor="email"
                className="block font-body text-xs text-white/50 uppercase tracking-wider mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 font-body text-white text-lg focus:outline-none focus:border-red-500 transition-colors placeholder:text-white/20"
                placeholder="john@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="form-field">
              <label
                htmlFor="message"
                className="block font-body text-xs text-white/50 uppercase tracking-wider mb-3"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 font-body text-white text-lg focus:outline-none focus:border-red-500 transition-colors resize-none placeholder:text-white/20"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="form-field pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group inline-flex items-center gap-4 px-8 py-4 rounded-full font-body text-sm transition-all duration-500 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-black hover:bg-red-500 hover:text-white'
                }`}
              >
                <span>
                  {isSubmitting
                    ? 'Sending...'
                    : submitted
                    ? 'Message Sent!'
                    : 'Send Message'}
                </span>
                <Send
                  className={`w-4 h-4 transform transition-transform ${
                    isSubmitting
                      ? 'animate-pulse'
                      : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <p className="font-body text-white/60 text-base leading-relaxed">
              I&apos;m always excited to discuss new ML projects, Django applications,
              or any innovative ideas you have in mind. Let&apos;s build something
              intelligent together.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="info-card glass-card p-6 rounded-sm flex items-center gap-6 group hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-red-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-body text-xs text-white/50 uppercase tracking-wider block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:vinodraja@email.com"
                    className="font-body text-white hover:text-red-500 transition-colors"
                  >
                    iamvinodraja@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-card glass-card p-6 rounded-sm flex items-center gap-6 group hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-red-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-body text-xs text-white/50 uppercase tracking-wider block mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="font-body text-white hover:text-red-500 transition-colors"
                  >
                    +92 349 0369520
                  </a>
                </div>
              </div>

              <div className="info-card glass-card p-6 rounded-sm flex items-center gap-6 group hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-red-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-body text-xs text-white/50 uppercase tracking-wider block mb-1">
                    Location
                  </span>
                  <span className="font-body text-white">
                    Pakistan
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <span className="font-body text-xs text-white/50 uppercase tracking-wider block mb-4">
                Connect With Me
              </span>
              <div className="flex gap-4">
                <a
                  href="https://www.github.com/iamvinodraja"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/iamvinodraja"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.x.com/iamvinodraja"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-body text-xs text-white/60 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  T
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
