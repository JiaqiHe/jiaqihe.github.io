'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline/next';

const blogData = [
  { 
    id: "first-post", 
    title: "My First Blog Post", 
    lastUpdate: "2024-03-20",
    path: "/blog/first-post"
  },
  { 
    id: "learning-nextjs", 
    title: "Learning Next.js", 
    lastUpdate: "2024-03-19",
    path: "/blog/learning-nextjs"
  },
  { 
    id: "web-development", 
    title: "Web Development Journey", 
    lastUpdate: "2024-03-18",
    path: "/blog/web-development"
  },
  { 
    id: "building-with-nextui", 
    title: "Building with NextUI", 
    lastUpdate: "2024-03-17",
    path: "/blog/building-with-nextui"
  },
  { 
    id: "animation-with-framer", 
    title: "Animation with Framer Motion", 
    lastUpdate: "2024-03-16",
    path: "/blog/animation-with-framer"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar className="bg-background/60 backdrop-blur-md">
        <NavbarBrand>
          <p className="font-bold text-inherit">Jiaqi He</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Projects
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

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
            <h1 className="text-6xl font-bold mb-4">Hi, I'm Jiaqi</h1>
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
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
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
