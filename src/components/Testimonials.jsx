import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { testimonials } from '../data/portfolioData';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Auto-slide carousel every 6 seconds unless paused by user
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const activeTestimonial = testimonials[activeIndex];

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSelect = (index) => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="relative py-28 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-red-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#ff2a2a]"></span>
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase font-semibold">Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            What Clients Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-500">About My Craft</span>
          </h2>

          <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
            Real feedback from creative directors, podcast producers, brand managers, and independent filmmakers.
          </p>
        </div>

        {/* Featured Testimonial Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Quote Card */}
          <div className="lg:col-span-8 bg-zinc-950/80 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-red-500/30 transition-all duration-500">
            {/* Background Decorative Quote Mark */}
            <div className="absolute top-4 right-8 text-white/[0.03] text-9xl font-serif font-black select-none pointer-events-none">
              “
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Rating Stars & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-1">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    <span className="px-3.5 py-1 text-xs font-mono font-bold text-red-400 bg-red-950/40 border border-red-500/20 rounded-full">
                      {activeTestimonial.projectType}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-white text-lg md:text-2xl font-medium leading-relaxed tracking-wide mb-10 italic">
                    "{activeTestimonial.quote}"
                  </blockquote>
                </div>

                {/* Author Info & Navigation Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <img 
                      src={activeTestimonial.avatar} 
                      alt={activeTestimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-red-500/40 shadow-md"
                      onError={(e) => {
                        // Fallback initials badge if image loading fails
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 border-2 border-red-500/40 hidden items-center justify-center text-white font-bold text-lg shadow-md">
                      {activeTestimonial.initials}
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-lg md:text-xl tracking-tight">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-white/60 text-xs md:text-sm font-mono">
                        {activeTestimonial.role} • <span className="text-red-400 font-semibold">{activeTestimonial.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#ff2a2a] hover:border-red-500 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                      aria-label="Previous Testimonial"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNext}
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#ff2a2a] hover:border-red-500 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                      aria-label="Next Testimonial"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Selector List */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(index)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 backdrop-blur-md flex items-center justify-between ${
                    isActive 
                      ? 'bg-zinc-900/90 border-red-500/50 shadow-[0_10px_30px_rgba(255,42,42,0.15)] translate-x-1' 
                      : 'bg-zinc-950/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name}
                      className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${isActive ? 'ring-2 ring-red-500' : 'opacity-70'}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-10 h-10 rounded-full bg-zinc-800 hidden items-center justify-center text-white text-xs font-bold ${isActive ? 'ring-2 ring-red-500' : ''}`}>
                      {item.initials}
                    </div>

                    <div>
                      <h5 className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
                        {item.name}
                      </h5>
                      <p className="text-white/40 text-[11px] font-mono truncate max-w-[170px]">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-xs font-mono font-bold">5.0</span>
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md" data-aos="fade-up">
          <div className="flex flex-col items-center text-center p-3 border-r border-white/5 last:border-none">
            <span className="text-2xl md:text-3xl font-black text-white tracking-tight">100%</span>
            <span className="text-xs text-white/50 font-mono mt-1">Client Satisfaction</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-r border-white/5 last:border-none">
            <span className="text-2xl md:text-3xl font-black text-red-500 tracking-tight">50+</span>
            <span className="text-xs text-white/50 font-mono mt-1">Video Edits Delivered</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-r border-white/5 last:border-none">
            <span className="text-2xl md:text-3xl font-black text-white tracking-tight">5.0 ★</span>
            <span className="text-xs text-white/50 font-mono mt-1">Average Review Rating</span>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <span className="text-2xl md:text-3xl font-black text-red-500 tracking-tight">&lt; 24h</span>
            <span className="text-xs text-white/50 font-mono mt-1">Average Response Time</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
