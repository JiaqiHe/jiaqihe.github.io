'use client'
import {Card, CardBody } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { useState } from "react";
import MainNavbar from '../components/Navbar';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import GoogleAnalytics from '../components/GoogleAnalytics';

const blogData = [
  {
    "id": "game-dev-1-creating-world-map",
    "title": "[Game Dev #1] Creating world map",
    "lastUpdate": "2024-11-30",
    "path": "/blog/game-dev-1-creating-world-map",
    "tags": [
      "Game dev log",
      "Godot",
      "TileMapLayer"
    ]
  },
  {
    "id": "a-taste-of-deep-reinforcement-learning",
    "title": "A Taste of Deep Reinforcement Learning",
    "lastUpdate": "2024-11-22",
    "path": "/blog/a-taste-of-deep-reinforcement-learning",
    "tags": [
      "DeepRL",
      "Godot",
      "Agent"
    ]
  },
  {
    "id": "3d-art-with-spline",
    "title": "3D Art With Spline",
    "lastUpdate": "2024-11-17",
    "path": "/blog/3d-art-with-spline",
    "tags": [
      "3D",
      "Spline",
      "Mixamo"
    ]
  },
  {
    "id": "creation-of-this-website",
    "title": "Creation of This Website",
    "lastUpdate": "2024-11-16",
    "path": "/blog/creation-of-this-website",
    "tags": [
      "Next.js",
      "GitHub Pages",
      "Cursor"
    ]
  }
];

// Add craftData array after blogData
const craftData = [
  {
    "id": "fish-pond-with-spline",
    "title": "Fish Pond with Spline",
    "lastUpdate": "Nov 2024",
    "path": "/craft/fish-pond-with-spline",
    "coverImage": "https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/craft/fish-pond-with-spline/cover.png",
    "tags": [
      "Spline",
      "3D",
      "Interactive"
    ]
  }
];

// Add new sections data
const sections = [
  { id: 'blog', title: 'BLOG', subtitle: 'My 5 Latest Posts' },
  { id: 'craft', title: 'CRAFT', subtitle: 'My Recent Works' },
  { id: 'space', title: '', subtitle: '' }, // Empty section for background viewing
];

export default function Home() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handlePrevSection = () => {
    setCurrentSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSection = () => {
    setCurrentSectionIndex((prev) => (prev < sections.length - 1 ? prev + 1 : prev));
  };

  const currentSection = sections[currentSectionIndex];

  return (
    <div className="min-h-screen">
      <GoogleAnalytics />
      <MainNavbar />

      <main className="container mx-auto px-6">
        <div className="fixed inset-0 w-screen h-screen">
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/IAWCEsrzY48RXI1y/scene.splinecode" 
          />
        </div>

        <motion.div 
          className="relative z-10 pt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold mb-4">
            Hi, I&apos;m{" "}
            <motion.span 
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Jiaqi
            </motion.span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 mb-6">
            Welcome to my portfolio space
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <motion.a
              href="https://www.linkedin.com/in/jiaqi-he-097826149/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-teal-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/JiaqiHe"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-teal-500 transition-colors"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://huggingface.co/jiaqihe"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-teal-500 transition-colors"
            >
              <SiHuggingface size={26} />
            </motion.a>
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.section 
              className="relative py-20 mt-32 min-h-[600px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              key={currentSection.id}
              transition={{ duration: 0.3 }}
            >
              {/* Only show background blur for non-empty sections */}
              {currentSection.id !== 'space' && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-md rounded-3xl" />
              )}
              
              {/* Left arrow */}
              <div 
                className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 ${
                  currentSectionIndex === 0 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-110 transition-transform'
                }`}
                onClick={handlePrevSection}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold text-gray-400/50 hover:text-white select-none"
                >
                  &#10216;
                </motion.div>
              </div>

              {/* Right arrow */}
              <div 
                className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 ${
                  currentSectionIndex === sections.length - 1 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-110 transition-transform'
                }`}
                onClick={handleNextSection}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold text-gray-400/50 hover:text-white select-none"
                >
                  &#10217;
                </motion.div>
              </div>
              
              {/* Section content */}
              {currentSection.id !== 'space' && (
                <div className="relative z-10 px-8 py-12">
                  <div className="absolute -top-10 left-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {currentSection.title}
                      </span>
                      <h2 className="text-3xl font-bold">{currentSection.subtitle}</h2>
                    </motion.div>
                  </div>

                  {/* Render different content based on current section */}
                  {currentSection.id === 'blog' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {blogData.map((blog) => (
                        <motion.div
                          key={blog.id}
                          className="h-[150px] w-full"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card 
                            className="w-full h-full bg-background/40 backdrop-blur-[2px]"
                            isPressable
                            onPress={() => {
                              window.location.href = blog.path;
                            }}
                          >
                            <CardBody className="flex flex-col justify-between p-4">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                  {blog.lastUpdate}
                                </p>
                                <h3 className="text-lg font-semibold">{blog.title}</h3>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {blog.tags.map((tag) => (
                                  <span 
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-700"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentSection.id === 'craft' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {/* Real craft card */}
                      {craftData.map((craft) => (
                        <motion.div
                          key={craft.id}
                          className="h-[250px] w-full" // Increased height for better image display
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card 
                            className="w-full h-full bg-background/40 backdrop-blur-[2px] overflow-hidden"
                            isPressable
                            onPress={() => {
                              window.location.href = craft.path;
                            }}
                          >
                            <div 
                              className="absolute inset-0 z-0 bg-cover bg-center"
                              style={{ 
                                backgroundImage: `url(${craft.coverImage})`,
                                opacity: 0.5
                              }}
                            />
                            <CardBody className="flex flex-col justify-between p-4 relative z-10">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-300">
                                  {craft.lastUpdate}
                                </p>
                                <h3 className="text-xl font-semibold text-white">
                                  {craft.title}
                                </h3>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {craft.tags.map((tag) => (
                                  <span 
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-700"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.section>
          </AnimatePresence>

          {/* Pagination dots outside AnimatePresence */}
          <div className="flex justify-center mt-8 mb-20 gap-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentSectionIndex 
                    ? 'bg-white' 
                    : 'bg-gray-400/50 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSectionIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
