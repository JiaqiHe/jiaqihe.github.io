'use client'
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline/next';
import { Orbitron } from 'next/font/google';
import NavBar from "./components/Navbar";

const orbitron = Orbitron({ 
  subsets: ['latin'],
  display: 'swap',
});

const blogData = [
  { 
    id: "first-post", 
    title: "My First Blog Post", 
    lastUpdate: "2024-03-20",
    path: "/blog/first-post",
    tags: ["#FirstPost", "#Introduction", "#Welcome"]
  },
  { 
    id: "learning-nextjs", 
    title: "Learning Next.js", 
    lastUpdate: "2024-03-19",
    path: "/blog/learning-nextjs",
    tags: ["#NextJS", "#WebDev", "#React"]
  },
  { 
    id: "web-development", 
    title: "Web Development Journey", 
    lastUpdate: "2024-03-18",
    path: "/blog/web-development",
    tags: ["#WebDev", "#Journey", "#Learning"]
  },
  { 
    id: "building-with-nextui", 
    title: "Building with NextUI", 
    lastUpdate: "2024-03-17",
    path: "/blog/building-with-nextui",
    tags: ["#NextUI", "#UI", "#Design"]
  },
  { 
    id: "animation-with-framer", 
    title: "Animation with Framer Motion", 
    lastUpdate: "2024-03-16",
    path: "/blog/animation-with-framer",
    tags: ["#Animation", "#FramerMotion", "#UI"]
  },
];

export default function Home() {
  return (
    <div className={`min-h-screen ${orbitron.className}`}>
      <NavBar />

      <main className="container mx-auto px-6">
        <div className="relative h-screen">
          <Spline
            className="absolute inset-0 z-0"
            scene="https://prod.spline.design/HEWx5ld1uE56GC3D/scene.splinecode"
          />
          <motion.div 
            className="relative z-10 pt-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-4">Hi, I&apos;m Jiaqi</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Welcome to my portfolio website
            </p>
          </motion.div>
        </div>

        <section className="py-20">
          <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  className="hover:scale-105 transition-transform duration-200"
                  isPressable
                  onPress={() => {
                    window.location.href = blog.path;
                  }}
                >
                  <CardBody>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter>
                    <p className="text-sm text-gray-500">
                      Last updated: {blog.lastUpdate}
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
