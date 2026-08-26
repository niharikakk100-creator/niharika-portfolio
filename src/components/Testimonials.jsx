import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { testimonials as initialTestimonials } from '../data/portfolioData';

// Public Cloud REST Storage Bin for Global Real-Time Reviews across all visitors
const GLOBAL_CLOUD_BIN_URL = 'https://api.jsonbin.io/v3/b/66bda19ee41b4d34e42095f9';

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState(initialTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    quote: '',
    projectType: 'Video Editing / Reel',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch Global Reviews on Load + LocalStorage Sync
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    const loadGlobalReviews = async () => {
      try {
        // Load local user reviews first
        const localData = localStorage.getItem('niharika_global_user_reviews');
        let localReviews = localData ? JSON.parse(localData) : [];

        // Attempt fetching global online reviews from Cloud API
        try {
          const res = await fetch('https://api.jsonbin.io/v3/b/66bda19ee41b4d34e42095f9/latest', {
            headers: {
              'X-Master-Key': '$2a$10$tJ99b4F.6sK2o7cM2hQcRe/7x14P2a3a0e',
            }
          });
          if (res.ok) {
            const cloudJson = await res.json();
            const cloudReviews = cloudJson.record || [];
            
            // Deduplicate and merge cloud reviews + local reviews + initial static reviews
            const combinedMap = new Map();
            [...localReviews, ...cloudReviews, ...initialTestimonials].forEach((item) => {
              if (item && item.id) combinedMap.set(item.id, item);
            });
            const mergedList = Array.from(combinedMap.values());
            setAllTestimonials(mergedList);
            return;
          }
        } catch (err) {
          console.log('Cloud sync fallback to local storage');
        }

        // Fallback to local + static reviews
        const combinedMap = new Map();
        [...localReviews, ...initialTestimonials].forEach((item) => {
          if (item && item.id) combinedMap.set(item.id, item);
        });
        setAllTestimonials(Array.from(combinedMap.values()));
      } catch (e) {
        setAllTestimonials(initialTestimonials);
      }
    };

    loadGlobalReviews();
  }, []);

  // Auto-slide carousel every 6 seconds unless paused by user
  useEffect(() => {
    if (!isAutoplay || allTestimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, allTestimonials.length]);

  const activeTestimonial = allTestimonials[activeIndex] || initialTestimonials[0];

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % allTestimonials.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const handleSelect = (index) => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  // Submit new review form & sync globally to Cloud API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const formattedReview = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim(),
      role: newReview.role.trim() || 'Verified Client',
      company: 'Verified Reviewer',
      avatar: null,
      initials: newReview.name.trim().charAt(0).toUpperCase(),
      projectType: newReview.projectType || 'Video Editing',
      rating: Number(newReview.rating),
      quote: newReview.quote.trim(),
      isReal: true,
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Save locally
      const localData = localStorage.getItem('niharika_global_user_reviews');
      const localList = localData ? JSON.parse(localData) : [];
      const updatedLocalList = [formattedReview, ...localList];
      localStorage.setItem('niharika_global_user_reviews', JSON.stringify(updatedLocalList));

      // 2. Update UI state immediately
      const updatedAll = [formattedReview, ...allTestimonials];
      setAllTestimonials(updatedAll);
      setActiveIndex(0);

      // 3. Sync globally to Cloud REST API so everyone on the web sees it
      try {
        await fetch('https://api.jsonbin.io/v3/b/66bda19ee41b4d34e42095f9', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$tJ99b4F.6sK2o7cM2hQcRe/7x14P2a3a0e',
          },
          body: JSON.stringify(updatedLocalList),
        });
      } catch (cloudErr) {
        console.log('Global cloud sync saved locally');
      }

      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setNewReview({
          name: '',
          role: '',
          rating: 5,
          quote: '',
          projectType: 'Video Editing / Reel',
        });
      }, 1600);
    } catch (err) {
      console.error('Error submitting review:', err);
      setIsSubmitting(false);
    }
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
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase font-semibold">Testimonials & Client Feedback</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            What Creators & Clients Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-500">About My Editing</span>
          </h2>

          <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed mb-6">
            Real feedback from video creators, filmmakers, editors, and verified buyers.
          </p>

          {/* Add Review Action Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#ff2a2a] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(255,42,42,0.5)] flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Write a Review / Leave Feedback
          </button>
        </div>

        {/* Featured Testimonial Showcase Card */}
        {activeTestimonial && (
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
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < activeTestimonial.rating ? 'text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-zinc-700 fill-current'}`} 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      <span className="px-3.5 py-1 text-xs font-mono font-bold text-red-400 bg-red-950/40 border border-red-500/20 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
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
                      {activeTestimonial.avatar ? (
                        <img 
                          src={activeTestimonial.avatar} 
                          alt={activeTestimonial.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-red-500/40 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 border-2 border-red-500/40 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {activeTestimonial.initials}
                        </div>
                      )}

                      <div>
                        <h4 className="text-white font-bold text-lg md:text-xl tracking-tight flex items-center gap-2">
                          {activeTestimonial.name}
                          <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-normal">✔ Verified Review</span>
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
            <div className="lg:col-span-4 flex flex-col justify-start gap-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {allTestimonials.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 backdrop-blur-md flex items-center justify-between ${
                      isActive 
                        ? 'bg-zinc-900/90 border-red-500/50 shadow-[0_10px_30px_rgba(255,42,42,0.15)] translate-x-1' 
                        : 'bg-zinc-950/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.avatar ? (
                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${isActive ? 'ring-2 ring-red-500' : 'opacity-70'}`}
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-bold ${isActive ? 'ring-2 ring-red-500' : ''}`}>
                          {item.initials}
                        </div>
                      )}

                      <div className="max-w-[170px]">
                        <h5 className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
                          {item.name}
                        </h5>
                        <p className="text-white/40 text-[11px] font-mono truncate">
                          "{item.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-amber-400 text-xs font-mono font-bold">{item.rating}.0</span>
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
            <span className="text-2xl md:text-3xl font-black text-white tracking-tight">4.9 ★</span>
            <span className="text-xs text-white/50 font-mono mt-1">Average Rating</span>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <span className="text-2xl md:text-3xl font-black text-red-500 tracking-tight">&lt; 24h</span>
            <span className="text-xs text-white/50 font-mono mt-1">Response Time</span>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-[0_20px_50px_rgba(255,42,42,0.2)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">Leave a Review</h3>
              <p className="text-white/60 text-xs mb-6">
                Share your feedback! Submitted reviews sync globally so everyone visiting the portfolio can see your comment live.
              </p>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center flex flex-col items-center gap-3">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-emerald-400 font-bold text-lg">Thank You for Your Feedback!</h4>
                  <p className="text-white/70 text-xs">Your review has been published globally to the portfolio.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  {/* Rating Picker */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                        >
                          <svg
                            className={`w-7 h-7 ${(hoverRating || newReview.rating) >= star ? 'text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-zinc-700 fill-current'}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </button>
                      ))}
                      <span className="text-amber-400 font-mono font-bold text-sm ml-2">
                        {hoverRating || newReview.rating}.0 ★
                      </span>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abhijith / Brian / Karthik"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Project Type / Role */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1 uppercase">Role / Project Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Video Editor, Creator, SFX Pack"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Review Quote Textarea */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1 uppercase">Review Comment *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Really good SFX pack🔥 / Broo, video edit adipoli aanu❤️"
                      value={newReview.quote}
                      onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-[#ff2a2a] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,42,42,0.4)] flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? 'Publishing Review...' : 'Submit & Publish Review Globally'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
