import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              WELCOME TO MY PORTFOLIO
            </h1>
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-200 mb-4">
              Hello, my name is <span className="text-primary-600">Ralph Bernard Serrano</span>
            </h2>
            <h3 className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6">
              I'm a Virtual Assistant & Web Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              With over 13 years of experience, I excel in project management and technical support. 
              I am dedicated to helping clients streamline their workflows and achieve their goals. 
              As I continue to enhance my expertise in web development and video editing, I embrace 
              new challenges that drive my growth. Outside of my professional pursuits, I find 
              inspiration in freediving—a sport that fosters focus, resilience, and a deep connection 
              with the underwater world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/assets/Ralph Bernard Serrano CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                download
              >
                Download My CV
              </a>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/images/hero.png"
                  alt="Ralph Bernard Serrano - AutoCAD Designer, Web Designer, Video Editor, and Virtual Assistant"
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
