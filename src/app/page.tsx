'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardBody } from "@nextui-org/react";
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="h-full"
                  isPressable
                  onPress={() => {
                    window.location.href = blog.path;
                  }}
                >
                  <CardBody className="flex flex-col gap-1 items-start">
                    <p className="text-sm text-gray-500">
                      {blog.lastUpdate}
                    </p>
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
