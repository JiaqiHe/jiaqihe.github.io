'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardBody } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { useState } from "react";

const blogData = [
  { 
    id: "first-post", 
    title: "My First Blog Post", 
    lastUpdate: "2024-03-20",
    path: "/blog/first-post",
    tags: ["Next.js", "React"]
  },
  { 
    id: "learning-nextjs", 
    title: "Learning Next.js", 
    lastUpdate: "2024-03-19",
    path: "/blog/learning-nextjs",
    tags: ["Next.js", "Tutorial"]
  },
  { 
    id: "web-development", 
    title: "Web Development Journey", 
    lastUpdate: "2024-03-18",
    path: "/blog/web-development",
    tags: ["Web Dev", "Career"]
  },
  { 
    id: "building-with-nextui", 
    title: "Building with NextUI", 
    lastUpdate: "2024-03-17",
    path: "/blog/building-with-nextui",
    tags: ["NextUI", "Design"]
  },
  { 
    id: "animation-with-framer", 
    title: "Animation with Framer Motion", 
    lastUpdate: "2024-03-16",
    path: "/blog/animation-with-framer",
    tags: ["Animation", "Framer"]
  },
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
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit hover:opacity-80 transition-opacity">
            Jiaqi He
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link 
              href="#"
              className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="#"
              className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Projects
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="#"
              className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

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
          <p className="text-xl text-gray-500 dark:text-gray-300">
            Welcome to my portfolio space!
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.section 
              className="relative py-20 mt-32 min-h-[400px]"
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
                      {/* Placeholder cards for craft section */}
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <motion.div
                          key={item}
                          className="h-[150px] w-full"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card 
                            className="w-full h-full bg-background/40 backdrop-blur-[2px]"
                            isPressable
                          >
                            <CardBody className="flex flex-col justify-between p-4">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                  Coming Soon
                                </p>
                                <h3 className="text-lg font-semibold">Project {item}</h3>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-700">
                                  Design
                                </span>
                                <span className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-700">
                                  Development
                                </span>
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
