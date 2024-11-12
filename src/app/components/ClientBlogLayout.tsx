'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import NavBar from './Navbar';

interface ClientBlogLayoutProps {
  title: string;
  date: string;
  tags: string[];
  children: React.ReactNode;
}

export default function ClientBlogLayout({ title, date, tags, children }: ClientBlogLayoutProps) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link href="/">
            <Button className="mb-8" variant="light">
              ← 返回首页
            </Button>
          </Link>
          
          <article className="prose dark:prose-invert lg:prose-xl">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="text-gray-500 mb-4">
              发布于 {date}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{children as string}</ReactMarkdown>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
} 