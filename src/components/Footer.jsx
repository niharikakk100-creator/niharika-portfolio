import React from 'react';
import { personalInfo, socialLinks, footerContent } from '../data/portfolioData';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          {footerContent.taglines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p>{footerContent.credential}</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p>Available for opportunities</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none text-[#f4f4f4] w-full text-center">
          {personalInfo.brandName.toLowerCase()}
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            {footerContent.copyright}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 md:items-center">
          <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">
            {personalInfo.emails.primary}
          </a>
          {/* Social Links */}
          {(socialLinks.linkedin || socialLinks.github) && (
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4d4d4] hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2.5 md:items-end">
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-center"
          >
            Hire Me
          </a>
          <p className="opacity-60">Available for Freelance</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
