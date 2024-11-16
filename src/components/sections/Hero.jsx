import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroContent from './hero/HeroContent';
import BackgroundElements from './hero/BackgroundElements';
import heroImage from '../../../assets/images/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });

    tl.to(textRef.current, {
      y: 50,
      opacity: 0.8,
      duration: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      <BackgroundElements />

      <div className="container mx-auto px-4 min-h-screen flex items-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div ref={textRef} className="z-10 pt-10 lg:pt-0">
            <HeroContent />
          </div>

          <div className="relative z-10 h-[450px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-[400px] h-[400px] lg:w-[450px] lg:h-[450px] mx-auto group perspective-1000">
              {/* Circular glass card effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/10 dark:to-gray-900/5 backdrop-blur-[2px] border border-white/20 dark:border-gray-700/20 shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-rotate-2" />
              
              {/* Image container */}
              <div className="relative w-full h-full p-4">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  {/* Gradient overlay for image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:from-gray-900/10 mix-blend-overlay" />
                  
                  <img
                    src={heroImage}
                    alt="Ralph"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
                    style={{
                      filter: 'contrast(1.02) brightness(1.02)'
                    }}
                  />
                </div>
              </div>

              {/* Circular decorative elements */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary-500/10 via-transparent to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              {/* Circular glow effect */}
              <div className="absolute -inset-[2px] bg-gradient-to-br from-primary-500/5 to-blue-500/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rotating border effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-purple-500/10 rounded-full opacity-40 group-hover:opacity-60 blur-2xl transition-opacity duration-500 animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
