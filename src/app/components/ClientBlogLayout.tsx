'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ClientBlogLayoutProps {
  title: string;
  date: string;
  tags?: string[];
  children: string;
}

export default function ClientBlogLayout({ title, date, tags = [], children }: ClientBlogLayoutProps) {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link href="/">
          <Button className="mb-8" variant="light">
            ← Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="space-y-2 text-gray-500 dark:text-gray-400">
            <time>Created on {date}</time>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <article className="prose prose-slate max-w-none dark:prose-invert prose-p:my-2 prose-li:my-0 prose-ul:my-2 prose-h2:mb-3 prose-h2:mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({children}: {children: string}) => (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  {children}
                </code>
              )
            }}
          >
            {children}
          </ReactMarkdown>
        </article>
      </motion.div>
    </div>
  );
} 