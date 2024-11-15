'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline/next';

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
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Jiaqi
            </motion.span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Welcome to my free & relaxing space
          </p>
        </motion.div>

        <section className="relative py-20 mt-32">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md rounded-3xl" />
          
          <div className="relative z-10 px-8 py-12">
            <div className="absolute -top-10 left-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  BLOG
                </span>
                <h2 className="text-3xl font-bold">My 5 Latest Posts</h2>
              </motion.div>
            </div>

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
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
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
          </div>
        </section>
      </main>
    </div>
  );
}
