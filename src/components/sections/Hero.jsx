import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowRight, HiDownload } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF('/models/laptop.glb');
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={2} />
    </Float>
  );
}

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });

    tl.to(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-400/20 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
            >
              Full Stack Developer & Designer
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-display leading-tight"
            >
              Creating Digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                Experiences
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            >
              I help businesses grow by crafting amazing web experiences. Through
              carefully crafted design and modern development techniques, I create
              websites that engage users and deliver results.
            </motion.p>
            <motion.div variants={itemVariants} className="flex space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
              >
                Let's Talk
                <HiArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/cv.pdf"
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 transition-all duration-300"
              >
                Download CV
                <HiDownload className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center space-x-6"
            >
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  5+
                </h4>
                <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  50+
                </h4>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  30+
                </h4>
                <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 h-[600px]"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Model />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
